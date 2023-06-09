const express = require("express");
const cors = require("cors");
const app = express();
const port = 9000;
const dataSet = {
  "@ajsoni": {
    isAdmin: true,
    password: "1234",
    isLoggedIn: false,
  },
  "@askumar": {
    isAdmin: false,
    password: "1234",
    isLoggedIn: false,
  },
};
let lastTaskIdCached = null;
let tableData = [
  {
    taskDesc: "Farewell ",
    owner: "@ajsoni",
    creator: "@ajsoni",
    status: 0,
    actions: 1,
    taskId: 1353,
    loggedHours: "12h",
  },
  {
    taskDesc: "Create visualisations for Admin Panel",
    owner: "@askumar",
    creator: "@ajsoni",
    status: 0,
    actions: 1,
    taskId: 1352,
    loggedHours: "14h",
  },
  {
    taskDesc: "Create API for Engg Panel",
    owner: "@sapalai",
    creator: "@askumar",
    status: 0,
    actions: 1,
    taskId: 1351,
    loggedHours: "10h",
  },
  {
    taskDesc: "Create Engg Panel",
    owner: "@askumar",
    creator: "@askumar",
    status: 0,
    actions: 1,
    taskId: 1350,
    loggedHours: "3h",
  },
  {
    taskDesc: "Learn CRM",
    owner: "@vimokashi",
    creator: "@askumar",
    status: 0,
    actions: 1,
    taskId: 1349,
    loggedHours: "6h",
  },
  {
    taskDesc: "Learn JavaScript",
    owner: "@ajsoni",
    creator: "@askumar",
    status: 0,
    actions: 1,
    taskId: 1348,
    loggedHours: "23h",
  },
  {
    taskDesc: "Learn Rootz JS",
    owner: "@ajsoni",
    creator: "@sapalai",
    status: 0,
    actions: 1,
    taskId: 1347,
    loggedHours: "17h",
  },
  {
    taskDesc: "Learn Redux Js",
    owner: "@trnaidu",
    creator: "@askumar",
    status: 0,
    actions: 1,
    taskId: 1346,
    loggedHours: "19h",
  },
  {
    taskDesc: "Learn React JS ",
    owner: "@askumar",
    creator: "@trnaidu",
    status: 0,
    actions: 1,
    taskId: 1345,
    loggedHours: "24h",
  },
  {
    taskDesc: "Learn HTML - Part 2",
    owner: "@ajsoni",
    creator: "@munarveriya",
    status: 0,
    actions: 1,
    taskId: 1344,
    loggedHours: "9h",
  },
  {
    taskDesc: "Learn CSS",
    owner: "@vimokashi",
    creator: "@ajsoni",
    status: 0,
    actions: 1,
    taskId: 1343,
    loggedHours: "12h",
  },
  {
    taskDesc: "Learn HTML",
    owner: "@ajsoni",
    creator: "@vimokashi",
    status: 0,
    actions: 1,
    taskId: 1342,
    loggedHours: "12h",
  },
  {
    taskId: 1341,
    taskDesc: "Create an Admin Panel",
    owner: "@trnaidu",
    creator: "@trnaidu",
    status: 0,
    loggedHours: "22h",
    actions: 1,
  },
];
function getStats(isAdmin, userName) {
  if (isAdmin)
    return {
      backlog: tableData.filter((x) => x.status === 0).length,
      inProgress: tableData.filter((x) => x.status === 1).length,
      complete: tableData.filter((x) => x.status === 2).length,
      closed: tableData.filter((x) => x.status === 3).length,
    };
  else;
  return {
    backlog: tableData.filter((x) => x.status === 0 && x.owner === userName)
      .length,
    inProgress: tableData.filter((x) => x.status === 1 && x.owner === userName)
      .length,
    complete: tableData.filter((x) => x.status === 2 && x.owner === userName)
      .length,
    closed: tableData.filter((x) => x.status === 3 && x.owner === userName)
      .length,
  };
}
app.use(express.json(), express.urlencoded(), cors());
app.get("/getTableData", (req, res) => {
  const userName = req.query?.userName || undefined;
  const isAdmin = dataSet[userName]?.isAdmin || false;

  if (isAdmin)
    res.send({
      tableData,
      isError: false,
      statData: getStats(isAdmin, userName),
    });
  else {
    res.send({
      tableData: tableData.filter((item) => item.owner === userName),
      isError: false,
      statData: getStats(isAdmin, userName),
    });
  }
});
app.post("/updateDataToTable", (req, res) => {
  const row = req.body.data || {};
  const userName = req.body.userName || "";
  const isAdmin = dataSet[userName]?.isAdmin || false;
  const tableDataUpdated = [...tableData];

  // delete the row
  if (
    row.taskDesc === "" &&
    row.owner === "" &&
    row.creator === "" &&
    row.status === "4" &&
    row.loggedHours === ""
  ) {
    const allRowsExpectToBeDeleted = tableDataUpdated.filter(
      (x) => x.taskId !== row?.taskId
    );
    tableData = [...allRowsExpectToBeDeleted];
    res.send({ tableData, isError: false, statData: getStats() });
    return;
  }
  const rowToBeUpdated = tableDataUpdated.find((x) => x.taskId === row?.taskId);

  rowToBeUpdated.taskId = row.taskId;
  rowToBeUpdated.taskDesc = row.taskDesc;
  rowToBeUpdated.owner = row.owner;
  rowToBeUpdated.creator = row.creator;
  rowToBeUpdated.status = row.status;
  rowToBeUpdated.loggedHours = row.loggedHours;
  rowToBeUpdated.actions =
    row.status < 3 ? Number(row.status) + 1 : row.actions;

  // immutability
  tableData = [...tableDataUpdated];

  if (isAdmin)
    res.send({
      tableData,
      isError: false,
      statData: getStats(isAdmin, userName),
    });
  else {
    res.send({
      tableData: tableData.filter((item) => item.owner === userName),
      isError: false,
      statData: getStats(isAdmin, userName),
    });
  }
});
app.post("/addDataToTable", (req, res) => {
  const newRow = req.body?.data || {};
  const userName = req.body.userName || "";
  const isAdmin = dataSet[userName]?.isAdmin || false;
  const newTaskId =
    lastTaskIdCached ||
    tableData.sort((a, b) => b.taskId - a.taskId)[0].taskId + 1;
  lastTaskIdCached = newTaskId + 1;
  newRow.status = 0;
  newRow.actions = 1;
  newRow.taskId = newTaskId;
  newRow.loggedHours = "0h";
  tableData = [newRow, ...tableData];

  if (isAdmin)
    res.send({
      tableData,
      isError: false,
      statData: getStats(isAdmin, userName),
    });
  else {
    res.send({
      tableData: tableData.filter((item) => item.owner === userName),
      isError: false,
      statData: getStats(isAdmin, userName),
    });
  }
});
app.post("/authenticateUser", (req, res) => {
  const req_UserName = req.body.userName || "";
  const req_Password = req.body.password || "";

  if (dataSet.hasOwnProperty(req_UserName)) {
    // check for the user's password
    if (dataSet[req_UserName].password === req_Password) {
      dataSet[req_UserName].isLoggedIn = true;
      res.send({
        isAuthenticated: true,
        message: "Ok",
        isAdmin: dataSet[req_UserName].isAdmin,
      });
    } else
      res.send({
        isAdmin: false,
        isAuthenticated: false,
        message: "password is incorrect",
      });
  } else
    res.send({
      isAdmin: false,
      isAuthenticated: false,
      message: "the username does not exist",
    });
});
app.post("/registerUser", (req, res) => {
  const req_UserName = req.body.userName || "";
  const req_Password = req.body.password || "";

  // extending the dataset
  dataSet[req_UserName] = {
    password: req_Password,
  };
  console.log(dataSet);
  res.send({ isRegistered: true });
});
app.post("/checkUserExists", (req, res) => {
  const req_UserName = req.body.userName || "";

  if (dataSet.hasOwnProperty(req_UserName)) {
    res.send({ isExistingUser: true });
  } else res.send({ isExistingUser: false });
});
app.get("/checkSession", (req, res) => {
  const req_UserName = req.query.usrn || "";
  console.log("asdfasdfasdf", req_UserName);

  if (!!req_UserName && dataSet[req_UserName]?.isLoggedIn === true) {
    res.send({ isAuthenticated: true, message: "Ok" });
  } else {
    res.send({
      isAuthenticated: true,
      message: "Ok",
      redirectUrl: "/login",
    });
  }
});
app.listen(port, () => {
  console.log("app server is live on port:", port);
});
