import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";

const getDateRangeForWeeklyCycle = (today) => {
  const dayOfWeek = today.getDay();
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  const lastSunday = new Date(lastMonday);
  lastSunday.setDate(lastMonday.getDate() + 6);
  return { lastMonday, lastSunday };
};

const getDateRangeForEarlyCycle = (today) => {
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);
  return { twoDaysAgo, today };
};

const getPaymentCycle = asyncHandler(async (req, res) => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const { lastMonday, lastSunday } = getDateRangeForWeeklyCycle(today);
  const { twoDaysAgo } = getDateRangeForEarlyCycle(today);

  const isFridayOrMonday = dayOfWeek === 1 || dayOfWeek === 5;

  try {
    const weeklyOrders = await Order.find({
      shippingDate: { $gte: lastMonday, $lte: lastSunday },
    });

    const earlyOrders = await Order.find({
      shippingDate: { $gte: twoDaysAgo, $lte: today },
    });

    const response = new ApiResponse(200, "Payment cycle status", {
      isWeeklyCycleActive: isFridayOrMonday && weeklyOrders.length > 0,
      isEarlyCycleActive: earlyOrders.length > 0,
    });
    res.status(200).json(response);
  } catch (error) {
    throw new ApiError(500, "Server Error");
  }
});

export { getPaymentCycle };
