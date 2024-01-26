import express, { json } from 'express';
import { Stripe } from 'stripe';
import cors from 'cors';
import {config} from 'dotenv'
config()
const secretKey=process.env.STRIPE_PUBLIC_KEY

// Reemplaza esto con tu clave secreta de Stripe
const stripe = new Stripe(secretKey);

const app = express();

// Configuración de CORS y JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/api/test',async (req, res) => {
  const data=[{"name":"dainelis.martinez","trafficD":325.84,"trafficW":0,"trafficM":0,totalQuota:500},{"name":"yasmany.quintana","trafficD":136.61,"trafficW":0,"trafficM":0,totalQuota:800}]
  res.json(data)
  console.log("test backend")
}
)
app.post('/api/checkout', async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'COmpra de perros',
      payment_method: id,
      confirm: true, //confirm the payment at the same time
    });

    console.log(payment);

    return res.status(200).json({ message: 'Successful Payment' });
  } catch (error) {
    console.log(error);
    // En lugar de devolver el mensaje de error directamente, 
    // puedes considerar el uso de un mensaje de error personalizado para mejorar la experiencia del usuario.
    return res.status(400).json({ message: 'Payment Failed', error: error.raw.message });
  }
});

app.listen(4000, () => {
  console.log('Server on port', 4000);
});
