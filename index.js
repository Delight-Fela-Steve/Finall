const express = require('express');
const cors = require('cors');
require('dotenv/config')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.get('/', (req,res)=>{
    return res.status(200).send({
        status:'success',
        data:{
            message:"Finall API"
        }
    });
});
const PORT  = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`);
})