import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

export const createNotification = (type) => {
  const closeTime = 2000;
  switch (type) {
    case "info":
      NotificationManager.info("Info message");
      break;
    case "success":
      NotificationManager.success("Success message", "Title here", 500);
      break;
    case "single_post_edit_saved":
      NotificationManager.success(
        "Success",
        "Changes have been saved",
        closeTime
      );
      break;
    case "single_post_delete_post":
      NotificationManager.success(
        "Success",
        "Post has been deleted",
        closeTime
      );
      break;
    case "admin_pending_approved":
      NotificationManager.success(
        "Success",
        "Post has been approved",
        closeTime
      );
      break;
    case "admin_pending_rejected":
      NotificationManager.success(
        "Success",
        "Post has been declined",
        closeTime
      );
      break;
    case "error_misc":
      NotificationManager.error(
        "Error",
        "An error occured while your request processing",
        closeTime
      );
      break;
    case "error":
      NotificationManager.error("Error message", "Click me!", 5000, () => {
        alert("callback");
      });
      break;
  }
};
