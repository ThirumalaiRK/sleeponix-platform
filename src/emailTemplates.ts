export const initialEmailTemplates = [
  {
    id: "order-confirmation",
    trigger: "Order Confirmation",
    title: "Your Sleeponix Order is Confirmed",
    description:
      "Sent automatically when a customer completes a purchase. Includes order summary and receipt.",
    subject: "Your Sleeponix Order is Confirmed!",
    content:
      "Dear Customer,\n\nThank you for your order! We are preparing it for shipment.\n\nBest regards,\nThe Sleeponix Team",
  },
  {
    id: "order-shipped",
    trigger: "Order Shipped",
    title: "Your Order is on its Way!",
    description:
      'Sent when an order\'s status is updated to "Shipping". Includes tracking information.',
    subject: "Your Sleeponix Order has Shipped!",
    content:
      "Dear Customer,\n\nGood news! Your order is on its way. Track here: [Tracking Link]\n\nBest regards,\nThe Sleeponix Team",
  },
  {
    id: "order-delivered",
    trigger: "Delivered",
    title: "Your Sleeponix Order Has Arrived",
    description: "Sent when the carrier marks the package as delivered.",
    subject: "Your Order is Delivered!",
    content:
      "Dear Customer,\n\nYour Sleeponix order has been delivered successfully.\n\nWarm Regards,\nThe Sleeponix Team",
  },
  {
    id: "return-approved",
    trigger: "Return Approved",
    title: "Return Request Approved",
    description: "Sent when a return request is approved.",
    subject: "Your Return Request is Approved",
    content:
      "Dear Customer,\n\nYour return request has been approved.\n\nBest,\nSleeponix Support",
  },
  {
    id: "feedback-request",
    trigger: "Feedback Request",
    title: "How is Your Sleeponix Product?",
    description: "Sent 7 days after delivery for review.",
    subject: "We'd Love Your Feedback!",
    content:
      "Dear Customer,\n\nWe hope you're enjoying your purchase! Please share your experience.\n\nThank you,\nSleeponix Team",
  },
  {
    id: "special-offer",
    trigger: "Special Offer",
    title: "A Special Thank You from Sleeponix",
    description: "Coupon or special promotions.",
    subject: "A Special Offer Just for You!",
    content:
      "Dear Customer,\n\nHere is a special offer just for you.\n\nWarm Wishes,\nSleeponix Team",
  },
];