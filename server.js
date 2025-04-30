const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const POWER_AUTOMATE_URL = 'https://prod-27.westeurope.logic.azure.com:443/workflows/1ee9701ecce840c7998e11bfeacd7717/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cy3bF2CpJH2IT6IvHNq0EIqbkJrkAJCikc55mc5Lu1o'

app.post('/verzend', async (req, res) => {
  try {
    const data = req.body;
    console.log('Ontvangen van GPT:', data);

    await axios.post(POWER_AUTOMATE_URL, data, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.status(200).send('Succesvol doorgestuurd naar Power Automate');
  } catch (error) {
    console.error('Fout:', error.message);
    res.status(500).send('Verwerking mislukt');
  }
});

app.listen(PORT, () => {
  console.log(`Server draait op poort ${PORT}`);
});
