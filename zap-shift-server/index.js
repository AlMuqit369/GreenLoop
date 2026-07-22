const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fcjsi2p.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("zap_shift_db");

    const usersCollection = db.collection("users");
    const businessesCollection = db.collection("businesses");
    const campaignsCollection = db.collection("campaigns");
    const notificationsCollection = db.collection("notifications");
    const collectorsCollection = db.collection("collectors");
    const parcelsCollection = db.collection("parcels");

    // ==========================================
    // HOME
    // ==========================================

    app.get("/", (req, res) => {
      res.send("GreenLoop Server Running...");
    });

    app.get("/test", (req, res) => {
      res.send({
        success: true,
      });
    });

    // ==========================================
    // USERS
    // ==========================================

    app.post("/users", async (req, res) => {
      const user = req.body;

      const existingUser = await usersCollection.findOne({
        email: user.email,
      });

      if (existingUser) {
        return res.send({
          message: "User already exists",
          insertedId: null,
        });
      }

      const result = await usersCollection.insertOne(user);

      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();

      res.send(result);
    });

    // ==========================================
    // BUSINESS ACCOUNTS
    // ==========================================

    app.post("/businesses", async (req, res) => {
      const result = await businessesCollection.insertOne(req.body);

      res.send(result);
    });

    app.get("/businesses", async (req, res) => {
      const result = await businessesCollection
        .find()
        .sort({ createdAt: -1 })
        .toArray();

      res.send(result);
    });

    app.patch("/businesses/:id", async (req, res) => {
      const id = req.params.id;

      const result = await businessesCollection.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            status: req.body.status,
          },
        }
      );

      res.send(result);
    });

    // ==========================================
    // COLLECTOR PERFORMANCE
    // ==========================================

    app.get("/collectors", async (req, res) => {
      const result = await collectorsCollection.find().toArray();

      res.send(result);
    });

    app.post("/collectors", async (req, res) => {
      const result = await collectorsCollection.insertOne(req.body);

      res.send(result);
    });

    // ==========================================
    // CAMPAIGNS
    // ==========================================

    app.get("/campaigns", async (req, res) => {
      const result = await campaignsCollection
        .find()
        .sort({ createdAt: -1 })
        .toArray();

      res.send(result);
    });

    app.post("/campaigns", async (req, res) => {
      const result = await campaignsCollection.insertOne(req.body);

      res.send(result);
    });

    app.delete("/campaigns/:id", async (req, res) => {
      const id = req.params.id;

      const result = await campaignsCollection.deleteOne({
        _id: new ObjectId(id),
      });

      res.send(result);
    });

    // ==========================================
    // NOTIFICATIONS
    // ==========================================

    app.get("/notifications", async (req, res) => {
      const result = await notificationsCollection
        .find()
        .sort({ createdAt: -1 })
        .toArray();

      res.send(result);
    });

    app.post("/notifications", async (req, res) => {
      const result = await notificationsCollection.insertOne(req.body);

      res.send(result);
    });

    app.delete("/notifications/:id", async (req, res) => {
      const id = req.params.id;

      const result = await notificationsCollection.deleteOne({
        _id: new ObjectId(id),
      });

      res.send(result);
    });

    // ==========================================
    // PARCELS
    // ==========================================

    app.get("/parcels", async (req, res) => {
      const result = await parcelsCollection.find().toArray();

      res.send(result);
    });

    app.post("/parcels", async (req, res) => {
      const result = await parcelsCollection.insertOne(req.body);

      res.send(result);
    });

    // ==========================================
    // ADMIN STATS
    // ==========================================

    app.get("/admin-stats", async (req, res) => {
      const totalUsers = await usersCollection.countDocuments();

      const totalBusinesses = await businessesCollection.countDocuments();

      const pendingBusinesses = await businessesCollection.countDocuments({
        status: "Pending",
      });

      const totalCampaigns = await campaignsCollection.countDocuments();

      const totalNotifications =
        await notificationsCollection.countDocuments();

      res.send({
        totalUsers,
        totalBusinesses,
        pendingBusinesses,
        totalCampaigns,
        totalNotifications,
      });
    });

    // ==========================================
// ADMIN USER MANAGEMENT
// ==========================================

      // Get All Users
      app.get("/all-users", async (req, res) => {
        const result = await usersCollection.find().toArray();
        res.send(result);
      });

      // Update User Role
      app.patch("/users/role/:id", async (req, res) => {
        const id = req.params.id;
        const role = req.body.role;

        const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              role,
            },
          }
        );

        res.send(result);
      });

      // ==========================================
// GET SINGLE USER BY EMAIL
// ==========================================

      app.get("/users/:email", async (req, res) => {
        const email = req.params.email;

        const result = await usersCollection.findOne({
          email: email,
        });

        res.send(result);
      });

    // ==========================================
    // DASHBOARD STATS
    // ==========================================

    app.get("/dashboard-stats", async (req, res) => {
      const totalUsers = await usersCollection.countDocuments();

      const totalBusinesses = await businessesCollection.countDocuments();

      const pendingBusinesses = await businessesCollection.countDocuments({
        status: "Pending",
      });

      const approvedBusinesses = await businessesCollection.countDocuments({
        status: "Approved",
      });

      const totalCampaigns = await campaignsCollection.countDocuments();

      const totalNotifications =
        await notificationsCollection.countDocuments();

      res.send({
        totalUsers,
        totalBusinesses,
        pendingBusinesses,
        approvedBusinesses,
        totalCampaigns,
        totalNotifications,
      });
    });

    await client.db("admin").command({ ping: 1 });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
}

run();

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});