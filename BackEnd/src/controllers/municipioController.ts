import { Request, Response } from 'express';
import { MunicipioService } from '../services/municipioService';

export const MunicipioController = {
  async getAll(req: Request, res: Response) {
    const data = await MunicipioService.getAll();
    res.json(data);
  },

  async search(req: Request, res: Response) {
    const nome = req.query.nome?.toString() || '';
    const data = await MunicipioService.searchByName(nome);
    res.json(data);
  },

  async byMinPop(req: Request, res: Response) {
    const min = parseInt(req.query.min as string);
    const data = await MunicipioService.getByMinPop(min);
    res.json(data);
  },

  async byPopRange(req: Request, res: Response) {
    const min = parseInt(req.query.min as string);
    const max = parseInt(req.query.max as string);
    const data = await MunicipioService.getByPopRange(min, max);
    res.json(data);
  },

  async capitalNaoMaisPop(req: Request, res: Response) {
    const data = await MunicipioService.getEstadosCapitalNaoMaisPop();
    res.json(data);
  },

  async top10NaoCapitais(req: Request, res: Response) {
    const data = await MunicipioService.getTop10NaoCapitais();
    res.json(data);
  }
};

// This controller handles requests related to municipios.
// It uses the MunicipioService to fetch data and respond to the client.