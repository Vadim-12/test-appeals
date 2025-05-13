import {
	AppealStatus,
	CreateAppealDto,
	CompleteAppealDto,
	CancelAppealDto,
	DateFilterDto,
	Appeal,
} from '../types';
import { prisma } from '../../lib/prisma';

export class AppealService {
	async createAppeal(dto: CreateAppealDto): Promise<Appeal> {
		return prisma.appeal.create({
			data: {
				topic: dto.topic,
				text: dto.text,
				status: AppealStatus.NEW,
			},
		});
	}

	async takeAppeal(id: string): Promise<Appeal> {
		return prisma.appeal.update({
			where: { id },
			data: { status: AppealStatus.IN_PROGRESS },
		});
	}

	async completeAppeal(id: string, dto: CompleteAppealDto): Promise<Appeal> {
		return prisma.appeal.update({
			where: { id },
			data: {
				status: AppealStatus.COMPLETED,
				solution: dto.solution,
			},
		});
	}

	async cancelAppeal(id: string, dto: CancelAppealDto): Promise<Appeal> {
		return prisma.appeal.update({
			where: { id },
			data: {
				status: AppealStatus.CANCELLED,
				cancellationReason: dto.cancellationReason,
			},
		});
	}

	async getAppeals(filters: DateFilterDto): Promise<Appeal[]> {
		let where = {};

		if (filters.date) {
			where = {
				createdAt: {
					gte: new Date(filters.date),
					lt: new Date(
						new Date(filters.date).setDate(new Date(filters.date).getDate() + 1)
					),
				},
			};
		} else if (filters.startDate && filters.endDate) {
			where = {
				createdAt: {
					gte: new Date(filters.startDate),
					lte: new Date(filters.endDate),
				},
			};
		}

		return prisma.appeal.findMany({
			where,
			orderBy: { createdAt: 'desc' },
		});
	}

	async cancelAllInProgress(): Promise<{ count: number }> {
		return prisma.appeal.updateMany({
			where: { status: AppealStatus.IN_PROGRESS },
			data: {
				status: AppealStatus.CANCELLED,
				cancellationReason: 'Массовая отмена обращений в работе',
			},
		});
	}
}
