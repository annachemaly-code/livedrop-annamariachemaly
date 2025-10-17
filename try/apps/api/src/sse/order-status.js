// src/routes/sse/order-status.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Import the existing Order model
const Order = mongoose.model("Order");

// Status flow sequence
const STATUS_FLOW = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

// GET /api/orders/:id/stream
router.get("/:id/stream", async (req, res) => {
  const { id } = req.params;

  // Validate order ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid order ID" });
  }

  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  console.log(`🔗 SSE client connected for order ${id}`);

  // Helper: send event
  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Send initial status
  sendEvent({ status: order.status });

  let currentIndex = STATUS_FLOW.indexOf(order.status);

  const advanceStatus = async () => {
    if (currentIndex >= STATUS_FLOW.length - 1) {
      console.log(`✅ Order ${id} already delivered. Closing SSE.`);
      res.end();
      return;
    }

    const nextStatus = STATUS_FLOW[currentIndex + 1];

    // Delay by 3–7 seconds depending on stage
    const delay =
      nextStatus === "PROCESSING"
        ? 3000 + Math.random() * 2000
        : 5000 + Math.random() * 2000;

    setTimeout(async () => {
      try {
        // Update DB
        await Order.findByIdAndUpdate(id, { status: nextStatus });
        currentIndex++;

        console.log(`📦 Order ${id} → ${nextStatus}`);
        sendEvent({ status: nextStatus });

        // Continue if not delivered
        if (nextStatus !== "DELIVERED") {
          advanceStatus();
        } else {
          console.log(`🎉 Order ${id} delivered! Closing SSE.`);
          res.end(); // DELIVERED already sent
        }
      } catch (err) {
        console.error("Error updating order:", err);
        res.end();
      }
    }, delay);
  };

  advanceStatus();

  // Cleanup on disconnect
  req.on("close", () => {
    console.log(`❌ Client disconnected from order ${id}`);
    res.end();
  });
});

module.exports = router;
