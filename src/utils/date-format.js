import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

export const formatDate = (dateString) => {
    const date = parseISO(dateString);
    const formattedDate = format(date, "d MMMM yyyy 'в' HH:mm", { locale: ruLocale });
    return formattedDate;
  };