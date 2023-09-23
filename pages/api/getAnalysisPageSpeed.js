import { PrismaClient } from '@prisma/client'
import axios from 'axios';

const getAnalysisPageSpeed = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    const params = {
      url: process.env.URL,
      category: 'PERFORMANCE',
      locale: 'Brazil',
      strategy: 'DESKTOP',
      key: process.env.PAGE_SPEED_KEY,
    };

    if (!process.env.URL || !process.env.PAGE_SPEED_KEY) {
      throw new Error('Environment variables not defined');
    }

    const response = await axios.get('https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed', {
      params: params,
    });

    const data = response.data;

    const lighthouseAudits = data.lighthouseResult.audits;

    const analysisData = {
      createAt: new Date(),
      firstContentfulPaint: lighthouseAudits["first-contentful-paint"]["score"],
      speedIndex: lighthouseAudits["speed-index"]["score"],
      timeToInteractive: lighthouseAudits["interactive"]["score"],
      firstMeaningfulPaint: lighthouseAudits["first-meaningful-paint"]["score"],
      firstCpuIdle: 0,
      estimatedInputLatency: lighthouseAudits["network-rtt"]["numericValue"],
    }

    const saveAnalysis = await prisma.Analysis.create({
      data: analysisData
    })

    res.status(200).json(data);
  } catch (error) {
    if (error.response) {
      console.error(error);
      res.status(error.response.status).json({ error: error.response.statusText });
    } else if (error.request) {
      res.status(500).json({ error: 'Error when querying the API' });
    } else {
      console.log(error);
    }
  }
};

export default getAnalysisPageSpeed;
