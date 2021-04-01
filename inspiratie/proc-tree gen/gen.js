
function line(start, direction, length, width) {
    /*         [x, y], degrees,   pixels, pixels */
    var dir_rad = direction * (Math.PI / 180);
    var end = [
      start[0] + length * Math.sin(dir_rad),
      start[1] - length * Math.cos(dir_rad),
    ];
    var path = new Path({
      segments: [start, end],
      strokeColor: "rgb(65, 60, 50)",
      strokeWidth: 0.5 + width,
      strokeCap: "round",
    });
    return end;
  }
  
  function randomizeAngle(width) {
    return (-0.5 + (Math.random())) * 30 * Math.min(1, 1/width*3);
  }
  
  
  function randomizeAngleLarge() {
    return (-0.5 + Math.random()) * 10;
  }
  
  
  function randomizeLen() {
    return 0.6 + (Math.random() * 0.8);
  } 
  
  var main_len = 1.9;
  var side_len = 1.1;
  var main_width = 0.94;
  var side_width = 0.33;
  var side_proability = 0.62;
  var main_angle = 12;
  var side_angle = 20;
  
  function grow(globalLevel, level, start, angle, width) {
    if (width <= 0.1 || globalLevel <= 0) {
      var lightness = Math.random() * 100;
      new Shape.Ellipse({
              center: start,
              size: [14, 5],
              fillColor: "rgb(" + (50 + lightness * 1.3) + ", " + (80 + lightness * 1.2) + ", " + (40 + lightness) + ")",
        opacity: Math.random() * 0.7,
        rotation: angle + 90 + randomizeAngleLarge() + randomizeAngleLarge(),
          });
      return;
    }
    if (level < 0) {
      grow(globalLevel, Math.max(Math.round(Math.sqrt(width) * 3), 1), start, angle, width);
      return;
    }
    if (level == 0) {
      var angle_rad = angle * (Math.PI / 180);
      if (Math.random() > globalLevel * 0.062) {
        grow(globalLevel - 1, Math.max(Math.round(randomizeLen() * Math.sqrt(width) * main_len), 1), [start[0] - width * 0.25, start[1] + width * 0.1], randomizeAngleLarge() + angle - main_angle + Math.sin(angle_rad) * 10, width * main_width * 0.66);
        grow(globalLevel - 1, Math.max(Math.round(randomizeLen() * Math.sqrt(width) * main_len), 1), [start[0] + width * 0.25, start[1] + width * 0.1], randomizeAngleLarge() + angle + main_angle + Math.sin(angle_rad) * 10, width * main_width * 0.66);
      } else {
        if (Math.random() < side_proability)
        grow(globalLevel - 1, randomizeLen() * Math.max(Math.sqrt(width) * side_len, 1), [start[0] - width * 0.4, start[1]], angle - side_angle, width * side_width);
        grow(globalLevel - 1, Math.max(Math.round(randomizeLen() * Math.sqrt(width) * main_len), 1), [start[0], start[1] + width * 0.1], randomizeAngleLarge() + angle, width * main_width);
        if (Math.random() < side_proability)
        grow(globalLevel - 1, randomizeLen() * Math.max(Math.sqrt(width) * side_len, 1), [start[0] + width * 0.4, start[1]], angle + side_angle, width * side_width);
      }
      return;
    }
    var end = line(start, angle, 6, width);
    grow(globalLevel, level - 1, end, angle + randomizeAngle(width), width * 0.996);
  }
  
  var tree_loc = [view.center.x, view.center.y * 2];
  grow(15, -1, tree_loc, 0, 28);
  
  function onResize(event) {
    view.center = new Point(tree_loc[0], tree_loc[1] * .5);
  }
  