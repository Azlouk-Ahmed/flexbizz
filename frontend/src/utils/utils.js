export const formatNumber = (num) => {
    if(!num) {
        return 0;
    } else if (num < 1000) {
      return num.toFixed(1).toString();
    } else if (num < 1000000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return (num / 1000000).toFixed(1) + 'm';
    }
};

export function formatDate(dateString) {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }