export type ProjectPhoto = {
  src: string;
  alt: string;
  location: string;
  projectType: string;
  priority?: boolean;
};

const newProjectPhotoFileNames = [
  "032.JPG",
  "040.JPG",
  "046.JPG",
  "062.JPG",
  "107.JPG",
  "114.JPG",
  "154.JPG",
  "20170425_203616794_iOS.jpg",
  "20180830_194227789_iOS.jpg",
  "20180901_010723707_iOS.jpg",
  "20181119_223215765_iOS.jpg",
  "259.JPG",
  "291.JPG",
  "472.JPG",
  "809.JPG",
  "870.JPG",
  "909.JPG",
  "911.JPG",
  "917.PNG",
  "927.JPG",
  "IMG_0837.PNG",
  "IMG_1606.JPG",
  "IMG_1744.JPG",
  "IMG_1840.JPG",
  "IMG_2402.JPG",
  "IMG_2448.JPG",
  "IMG_2453.JPG",
  "IMG_2457.JPG",
  "IMG_2504.JPG",
  "IMG_2655.JPG",
  "IMG_2971.JPG",
  "IMG_3348.JPG",
  "IMG_3379.JPG",
  "IMG_3526.JPG",
  "IMG_3535.JPG",
  "IMG_4187.JPG",
  "IMG_4343.JPG",
  "IMG_4500.JPG",
  "IMG_4502.JPG",
  "IMG_4526.JPG",
  "IMG_4558.JPG",
  "IMG_4560.JPG",
  "IMG_4561.JPG",
  "IMG_4562.JPG",
  "IMG_4570.JPG",
  "IMG_5149.JPG",
  "IMG_5626.JPG",
  "IMG_6926.JPG"
];

const newProjectPhotos: ProjectPhoto[] = newProjectPhotoFileNames.map((fileName, index) => ({
  src: `/images/projects/newphotos/${fileName}`,
  alt: `Window and door installation project photo ${index + 1}`,
  location: "Southern California",
  projectType: "Installation Project"
}));

export const projectPhotos: ProjectPhoto[] = [
  {
    src: "/images/projects/newphotos/IMG_2448.JPG",
    alt: "Contemporary home window and door installation",
    location: "Aspen, Colorado",
    projectType: "European Window Install",
    priority: true
  },
  {
    src: "/images/projects/door2.jpg",
    alt: "Large bifold door installation opening to patio",
    location: "Crystal Cove, California",
    projectType: "French Door Install",
    priority: true
  },
  {
    src: "/images/projects/window1.jpg",
    alt: "Modern black frame window installation",
    location: "Manhattan, New York",
    projectType: "Service & Maintenance",
    priority: true
  },
  {
    src: "/images/projects/window2.jpg",
    alt: "High-end residential window replacement",
    location: "Laguna Beach, California",
    projectType: "Service & Maintenance"
  },
  {
    src: "/images/projects/newphotos/IMG_4570.JPG",
    alt: "Custom glass door installation",
    location: "Dana Point, California",
    projectType: "Sliding Door Install"
  },
  {
    src: "/images/projects/imageofdoor.jpg",
    alt: "Precision-fitted modern door and trim details",
    location: "Manhattan Beach, California",
    projectType: "Installation"
  },
  {
    src: "/images/projects/newphotos/IMG_4561.JPG",
    alt: "Large-format sliding window and door opening",
    location: "Malibu, California",
    projectType: "Installation"
  },
  {
    src: "/images/projects/extra2.jpg",
    alt: "European-style casement windows in coastal home",
    location: "La Jolla, California",
    projectType: "Sliding Door Service"
  },
  {
    src: "/images/projects/anotherone.jpg",
    alt: "Refined exterior door and glazing installation",
    location: "Pasadena",
    projectType: "High-End Retrofit"
  },
  ...newProjectPhotos
];
