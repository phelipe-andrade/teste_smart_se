export default function formatDate(date: any){
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  if(!isoRegex.test(date)) return date;

  const format = new Date(date).toLocaleString().split(',');  
  return `${format[0]} as ${format[1]}`;
}