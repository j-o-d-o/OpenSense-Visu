const ipc = require('../node_modules/node-ipc');
const fs = require('fs');


let frameData = {
  objects: [
    {
      trackId: "0",
      class: 0,
      depth: false,
      position: [10, 1, 10],
      height: 1.5,
      width: 0.5,
      ttc: 1,
    },
    {
      trackId: "1",
      class: 4,
      depth: false,
      position: [-2, 0, 20],
      height: 1.5,
      width: 2,
      ttc: 0.4,
    }
  ],
  sensor: {
    position: [0, 1.2, -0.5],
    rotation: [0, 0, 0],
    image: null,
    fovHorizontal: (1/2)*Math.PI,
    fovVertical: (1/4)*Math.PI,
  },
  timestamp: 0
};

var sockets = {};
var frame = 0;

ipc.config.id = 'server';
ipc.config.silent=true;

setInterval(async () => { 
  // Send data to each socket (stop in case there is no client to serve)
  if(Object.keys(sockets).length > 0) {
    frame++;
    if(frame >= 30) frame = 0; // There are only 30 frames for the video data
    frameData.timestamp = frame;
    frameData.objects[0].position[0] -= 0.5;
    if(frameData.objects[0].position[0] > 20) frameData.objects[0].position[0] = -10;
    frameData.objects[1].position[3] += 0.1;
    if(frameData.objects[0].position[3] > 60) frameData.objects[0].position[3] = 10;

    // Read from video frames on file system
    let imgPath = "00000" + frame.toString();
    imgPath = "../assets/sample_video_frames/" + imgPath.substring(imgPath.length - 6) + ".jpg";

    const binaryImg = fs.readFileSync(imgPath);
    const base64Img = new Buffer(binaryImg).toString('base64');

    frameData.sensor.image = base64Img;
    for (const key of Object.keys(sockets)) {
      console.log("Sending to: " + key);
      ipc.server.emit(sockets[key], 'server.frame', {
        frame: JSON.stringify(frameData),
      });
    }
  }
}, 2000);

ipc.serve(() => {
  ipc.server.on('client.register', (data, socket) => {
    // Register Client
    sockets[data.id] = socket;
  });
  ipc.server.on("socket.disconnected", socket => {
    delete sockets[socket.id];
  });
});
ipc.server.start()
