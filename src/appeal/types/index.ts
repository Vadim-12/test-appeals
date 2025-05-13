import {
	AppealStatus,
	AppealStatus as PrismaAppealStatus,
} from '@prisma/client';

export { PrismaAppealStatus as AppealStatus };

export interface Appeal {
	id: string;
	topic: string;
	text: string;
	status: AppealStatus;
	createdAt: Date;
	updatedAt: Date;
	solution?: string | null;
	cancellationReason?: string | null;
}

export interface CreateAppealDto {
	topic: string;
	text: string;
}

export interface CompleteAppealDto {
	solution: string;
}

export interface CancelAppealDto {
	cancellationReason: string;
}

export interface DateFilterDto {
	date?: Date;
	startDate?: Date;
	endDate?: Date;
}
