export const calculateTotalHours = (
    start: string,
    end: string,
    breakTime: string
  ): string => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    const [breakHour, breakMinute] = breakTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(startHour, startMinute);
    const endDate = new Date();
    endDate.setHours(endHour, endMinute);
    const breakDuration = breakHour * 60 + breakMinute;
    const diffMinutes =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60) - breakDuration;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = Math.floor(diffMinutes % 60);
    return `${hours}h${minutes > 0 ? minutes + "m" : ""}`;
  };
  
  export const calculateCost = (totalHours: string, hourlyRate: number): string => {
    const [hours, minutes] = totalHours.split(/[hm]/).map(Number);
    const totalMinutes = hours * 60 + (minutes || 0);
    const totalHoursDecimal = totalMinutes / 60;
    const cost = Math.round(totalHoursDecimal * hourlyRate);
    return cost.toString();
  };

  export const calculateLeaveTotalHours = (start: string, end: string): string => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
  
    const startDate = new Date();
    startDate.setHours(startHour, startMinute);
  
    const endDate = new Date();
    endDate.setHours(endHour, endMinute);
  
    const diffMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
  
    const hours = Math.floor(diffMinutes / 60);
    const minutes = Math.floor(diffMinutes % 60);
  
    return `${hours}h${minutes > 0 ? minutes + "m" : ""}`;
  };


  