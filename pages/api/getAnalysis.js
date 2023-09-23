import axios from 'axios';

const getAnalysis = async (req, res) => {
  try {
    const params = {
      url: process.env.URL,
      category: 'PERFORMANCE',
      locale: 'Brazil',
      strategy: 'DESKTOP',
      key: process.env.PAGE_SPEED_KEY,
    };

    if (!process.env.URL || !process.env.PAGE_SPEED_KEY) {
      throw new Error('Variáveis de ambiente não definidas');
    }

    const response = await axios.get('https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed', {
      params: params,
      timeout: 1000
    });
    const data = response.data;

    res.status(200).json(data);
  } catch (error) {
    if (error.response) {
      console.error(error);
      res.status(error.response.status).json({ error: error.response.statusText });
    } else if (error.request) {
      res.status(500).json({ error: 'Erro ao consultar a API' });
    } else {
      res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
};

export default getAnalysis;
