const router = require("express").Router();

const authenticationController = require("../modules/authenticationController");
const updateProfile = require("../modules/updateProfile");
const addTask = require("../modules/addTasks");
const getRoom = require("../modules/getRoom");
const rankUpdate = require("../modules/rankUpdate");
const blogs = require("../modules/blogs");
const admin = require("../modules/admin");
const dashboard=require("../modules/dashboard");

const base = "/";
router.get(`${base}login`, authenticationController.getLogin);
router.post(`${base}register`, authenticationController.register);
router.get(
  `${base}isUserAuth`,
  authenticationController.verifyJWT,
  authenticationController.userAuth
);
router.post(`${base}login`, authenticationController.login);
router.post(`${base}logout`, authenticationController.logout);

router.post(`${base}updateDetails`, updateProfile.updateDetails);
router.post(`${base}changePassword`, updateProfile.changePassword);
router.post(`${base}updatePersonalInfo`, updateProfile.updatePersonalInfo);
router.post(`${base}updateSocials`, updateProfile.updateSocials);
router.post(`${base}deleteAccount`, updateProfile.deleteAccount);

router.post(`${base}sendTask`, addTask.sendTask);
router.post(`${base}sendRoomDetails`, addTask.sendRoomDetails);
router.post(`${base}getRoomDetails`, getRoom.getRoomDetails);
router.post(`${base}getTaskDetails`, getRoom.getTaskDetails);
router.post(`${base}getUserRooms`, getRoom.getUserRooms);
router.post(`${base}checkUserRooms`, getRoom.checkUserRooms);
router.post(`${base}isAnswered`, getRoom.isAnswered);
router.post(`${base}getProgress`, getRoom.getProgress);

router.post(`${base}updateRank`, rankUpdate.updateRank);

router.get(`${base}getBlogs`, blogs.getBlog);
router.post(`${base}addBlog`, blogs.addBlog);
router.post(`${base}getBlogPage`,blogs.getBlogPage);

// areeb's work here
router.get(`${base}getAdminData`,admin.getAdminData);

router.get(`${base}getDashboard/:id`,dashboard.getDashboard);








// saad's work here









module.exports = router;
