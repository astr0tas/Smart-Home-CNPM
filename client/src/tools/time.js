export const formatDateAndTime = (date) =>
{
      date = new Date(date);
      // Turn dow, dd mm yyyy hh:mm:ss GMT to hh/mm/ss - dd/mm/yyyy
      return `${ String(date.getHours()).padStart(2, '0') }:${ String(date.getMinutes()).padStart(2, '0') }:${ String(date.getSeconds()).padStart(2, '0') } - ${ String(date.getDate()).padStart(2, '0') }/${ String(date.getMonth() + 1).padStart(2, '0') }/${ date.getFullYear() }`;
}