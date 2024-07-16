import express from 'express';
import {createClient} from '@supabase/supabase-js'
import morgan from 'morgan'
// import express from "body-parser";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// using morgan for logs
app.use(morgan('combined'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_KEY);

app.get('/services', async (req, res) => {
    const {data, error} = await supabase
        .from('services')
        .select(`
        id,
        name,
        codeUSSD
      `)

      if (error) {
        console.log("Test ",error);
      } else {
        console.log(data);
        res.send(data);
      }
});


app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});