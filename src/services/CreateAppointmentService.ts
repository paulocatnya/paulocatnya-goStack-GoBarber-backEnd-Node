import { startOfHour,isBefore } from 'date-fns'
import {getCustomRepository} from 'typeorm'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import AppError from '../errors/AppError'


interface Request {
    provider_id: string,
    date: Date;
}

class CreateAppointmentService {
    
    public async execute({ date, provider_id }: Request): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );
        
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        if (isBefore(appointmentDate,Date.now())) {
            throw new AppError(`You cannot schedule for dates less than today`);
        }


        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment);

        return appointment;

    }
}

export default CreateAppointmentService;