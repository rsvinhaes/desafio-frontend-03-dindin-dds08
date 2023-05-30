import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const formatDay = (date) => {
    return format(parseISO(date), 'iii', {
        locale: ptBR
    })
}