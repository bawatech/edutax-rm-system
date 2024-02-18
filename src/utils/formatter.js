import moment from "moment"

export const showDatetime=(input)=>{
    if(moment(input).isValid){
        return moment(input).format('DD-MMM-YY HH:mm')
    }
    return null
}

export const showDate=(input)=>{
    if(moment(input).isValid){
        return moment(input).format('DD-MMM-YYYY')
    }
    return null
}