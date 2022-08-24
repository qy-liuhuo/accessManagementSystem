import request from '@/utils/request'
const DIR = "https://accessmanage.qylh.xyz/index.php/index/index/";
//const DIR = "http://localhost:9528/";
export function login(data) {
  console.log(data);
  return request({
    url: DIR + 'login',
    method: 'post',
    data: data
  })
}

export function getPieData() {
  return request({
    url: DIR + 'getPieData',
    method: 'get',
  })
}

export function getRiskItems() {
  return request({
    url: DIR + 'getRiskItems',
    method: 'get',
  })
}

export function openDoor() {
  return request({
    url: DIR + 'openDoor',
    method: 'get',
  })
}

export function closeDoor() {
  return request({
    url: DIR + 'closeDoor',
    method: 'get',
  })
}

export function getInfo(token) {
  return request({
    url: DIR + 'getInfo',
    method: 'get',
    params: { token: token }
  })
}

export function logout() {
  return request({
    url: DIR + 'logout',
    method: 'post'
  })
}
export function getRegionList(data) {

  return request({
    url: DIR + 'getRegionList',
    method: 'get',
  })
}
export function getPolicy(data) {
  return request({
    url: DIR + 'getPolicy',
    method: 'get',
  })
}
export function updatePolicy(data) {
  return request({
    url: DIR + 'updatePolicy',
    method: 'post',
    data: data,
  })
}


export function selectUserByName(data) {
  return request({
    url: DIR + 'selectUserByName',
    method: 'post',
    data: data,
  })
}
export function addRecord(data) {
  return request({
    url: DIR + 'addRecord',
    method: 'post',
    data: data,
  })
}
export function updateInfo(data) {

  return request({
    url: DIR + 'updateInfo',
    method: 'post',
    data: {
      newPassword: data.password,
      newPhone: data.phone,
      newName: data.name,
      header: data.header,
    }
  })
}


export function delUser(data) {
  return request({
    url: DIR + 'delUser',
    method: 'post',
    data: data,
  })
}

export function addAdmin(data) {

  return request({
    url: DIR + 'addAdmin',
    method: 'post',
    data,
  })
}

export function addPasserby(data) {
  return request({
    url: DIR + 'addPasserby',
    method: 'post',
    data,
  })
}

export function adminList() {
  return request({
    url: DIR + "adminList",
    method: "get",
  })
}

export function userList(query) {
  return request({
    url: DIR + 'userList',
    method: 'get',
    params: query
  })
}
export function recordList(query) {
  return request({
    url: DIR + 'recordList',
    method: 'get',
    params: query
  })
}
export function editUser(data) {
  return request({
    url: DIR + 'editUser',
    method: 'post',
    params: data
  })
}

export function saveAdminChange(data) {
  return request({
    url: DIR + "saveAdminChange",
    method: "post",
    data,
  })
}

export function getNum() {
  return request({
    url: DIR + 'getNum',
    method: 'get',
  })
}
export function getLineData() {
  return request({
    url: DIR + 'getLineData',
    method: 'get',
  })
}