const jwt = require("jsonwebtoken")
const { Pool, Client } = require('pg')
const pool = new Pool()



const login = async (req,res) => {

    const email = req.body.email
    const password = req.body.password
    const text = `SELECT * FROM accounts WHERE email = $1 and password = $2`
     try {
        const user = await pool.query(text, [email,password])
        userdata = user.rows[0]
        console.log(userdata);
 
        
 
           if (userdata !== undefined) {
             const payload = {
                 id: userdata.id,
                 email: userdata.email
                }
             const accessToken = jwt.sign({ payload},"mySecretKey",{expiresIn: "9000000"})
             const refreshToken = jwt.sign({ payload},"mySecretKey")
 
             res.cookie('access_token', accessToken, {
                 httpOnly: true,
                 secure: true,
                 sameSite: true 
 
                 /*
                 
                 Same Site - prevents the cookie from being sent in cross-site requests
                 HTTP Only - cookies are only accessible from a server
                 Secure - cookie must be transmitted over HTTPS
 
                 */
             }).status(200).json({
                 userdata,
                 accessToken,
                 
             })
             
         //     status(200).json({
         //     userdata,
         //     accesToken,
         //     refreshToken
         //    })
         } else {
             res.status(404).json("User not found !")
         }
        
     } catch (err) {
         res.status(500).json(err.stack)
     }
   }



  const logout = (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json('Logout success')
}




 

   module.exports = {
    login,
    logout
   }