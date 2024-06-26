export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatTime(inputDateTime: string): string {
  const date = new Date(inputDateTime);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}
export function castDate(inputDate: Date): string {
  // Verifica si inputDate es realmente un objeto Date
  const newDate = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const dateStr = newDate.toLocaleDateString("es-ES", options);
  return dateStr.replace(/\//g, "-"); // Reemplaza las barras por guiones según el formato deseado
}
