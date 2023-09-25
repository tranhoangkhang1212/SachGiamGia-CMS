import moment from 'moment';

export const formatDateUTC = (time: string, format = 'DD/MM/YYYY HH:mm:ss.SSS UTC') => {
    return moment(time).format(format);
};
