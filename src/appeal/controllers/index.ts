import { Request, Response } from 'express';
import {
	CreateAppealDto,
	CompleteAppealDto,
	CancelAppealDto,
	DateFilterDto,
} from '../types';
import { AppealService } from '../services/appeal.service';

export class AppealController {
	private appealService: AppealService;

	constructor() {
		this.appealService = new AppealService();
	}

	async createAppeal(req: Request<{}, {}, CreateAppealDto>, res: Response) {
		try {
			const appeal = await this.appealService.createAppeal(req.body);
			return res.status(201).json(appeal);
		} catch (error) {
			return res.status(500).json({ error: 'Ошибка при создании обращения' });
		}
	}

	async takeAppeal(req: Request<{ id: string }>, res: Response) {
		try {
			const { id } = req.params;
			const appeal = await this.appealService.takeAppeal(id);
			return res.json(appeal);
		} catch (error) {
			return res
				.status(500)
				.json({ error: 'Ошибка при взятии обращения в работу' });
		}
	}

	async completeAppeal(
		req: Request<{ id: string }, {}, CompleteAppealDto>,
		res: Response
	) {
		try {
			const { id } = req.params;
			const appeal = await this.appealService.completeAppeal(id, req.body);
			return res.json(appeal);
		} catch (error) {
			return res.status(500).json({ error: 'Ошибка при завершении обращения' });
		}
	}

	async cancelAppeal(
		req: Request<{ id: string }, {}, CancelAppealDto>,
		res: Response
	) {
		try {
			const { id } = req.params;
			const appeal = await this.appealService.cancelAppeal(id, req.body);
			return res.json(appeal);
		} catch (error) {
			return res.status(500).json({ error: 'Ошибка при отмене обращения' });
		}
	}

	async getAppeals(req: Request<{}, {}, {}, DateFilterDto>, res: Response) {
		try {
			const appeals = await this.appealService.getAppeals(req.query);
			return res.json(appeals);
		} catch (error) {
			return res
				.status(500)
				.json({ error: 'Ошибка при получении списка обращений' });
		}
	}

	async cancelAllInProgress(req: Request, res: Response) {
		try {
			const result = await this.appealService.cancelAllInProgress();
			return res.json(result);
		} catch (error) {
			return res.status(500).json({ error: 'Ошибка при отмене обращений' });
		}
	}
}
