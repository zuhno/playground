const data = [434, 469, 846, 760, 978, 895, 818, 556, 798, 637, 929, 181, 46, 890, 766, 348, 797, 107, 680, 956, 887, 263, 539, 518, 260, 388, 503, 282, 186, 32, 77, 490, 480, 307, 19, 25, 759, 256, 433, 866, 661, 975, 174, 460, 465, 701, 573, 240, 967, 812, 362, 987, 843, 86, 677, 779, 826, 611, 964, 68, 670, 293, 212, 396, 822, 496, 217, 842, 216, 928, 799, 623, 280, 872, 550, 483, 18, 948, 736, 868, 371, 414, 368, 769, 367, 882, 917, 650, 643, 652, 91, 8, 814, 531, 93, 283, 883, 889, 724, 115];

const main = () => { // O(n^2)
  for (let i = 0; i < data.length; i++) { // O(n)
    let minIndex = i;
    for (let j = i + 1; j < data.length; j++) { // O(n)
      if (data[minIndex] > data[j]) {
        minIndex = j;
      }
    }
    [data[i], data[minIndex]] = [data[minIndex], data[i]];
  }
}

main();

console.log(data);