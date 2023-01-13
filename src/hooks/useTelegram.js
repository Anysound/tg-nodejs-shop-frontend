export function useTelegram() {
  const onClose = () => {
    process.env.TG_API.close();
  };

  const onToggleButton = () => {
    if (process.env.TG_API.MainButton.isVisible) {
      process.env.TG_API.MainButton.hide();
    } else {
      process.env.TG_API.MainButton.show();
    }
  }

  return {
    onClose,
    onToggleButton,
    user: process.env.TG_API.initDataUnsafe?.user,
    queryId: process.env.TG_API.initDataUnsafe?.query_id
  }
}
