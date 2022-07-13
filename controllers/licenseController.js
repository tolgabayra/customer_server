const { Pool } = require('pg')
const pool = new Pool()
const jwt = require("jsonwebtoken")



const getLicense = async (req,res) => {
    const id = req.params.id
    if(id == req.user.payload.id){
  
      try{
        const license = await pool.query('SELECT * FROM licenses WHERE accounts_id = $1', [id])
        res.status(200).json(license.rows)
      }catch(err){
        res.status(500).json(err)
      }
  
    }else{
      res.status(500).json("Yetkiniz yoktur...")
    }
   
   
  }




  const deleteLicense = async (req,res) => {
    const id = req.params.id
 
    try {
        await pool.query('DELETE FROM licenses WHERE id = $1', [id])
        res.status(200).json("Lisans silme işlemi basarili")
    } catch (err) {
        res.status(500).json(err)
    }

  }


const updateLicense = async (req,res) => {
    const id = parseInt(req.params.id)
  
    const {name, status} = req.body
  
    await pool.query(
      'UPDATE licenses SET name = $1, status = $3 WHERE id = $3', [name, status, id],(result, error) => {
        if(error){
          throw error
        }
        res.status(200).json(`License modified with id:${id}`)
   })
  }


  const downloadLicense = async (req,res) => {
    let filePath = "/my/file/path"
    let fileName
  }
  



module.exports = {
    getLicense,
    deleteLicense,
    updateLicense

}