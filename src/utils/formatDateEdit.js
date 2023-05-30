import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const formatDateEdit = (date) => {
    return format(parseISO(date), 'yyyy-MM-dd', {
        lacale: ptBR
    })
}