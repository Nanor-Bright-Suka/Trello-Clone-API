
const {backgroundColors, backgroundImages} = require("../utils/colorandimage")
const {throwError} = require("../utils/throwError")


  
  const validateColor = (background_color: string) => {
    const HEX_REGEX = /^#([A-Fa-f0-9]{6})$/;
    const RGB_REGEX = /^rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)$/;
    const HSL_REGEX = /^hsl\((\d{1,3}),\s?(\d{1,3})%,\s?(\d{1,3})%\)$/;
    if (background_color === null || background_color === undefined) return;
    if (!background_color.trim() || !(backgroundColors.includes(background_color.toLowerCase()) || HEX_REGEX.test(background_color) || RGB_REGEX.test(background_color) || HSL_REGEX.test(background_color))) {
     return throwError(`Invalid background color: '${background_color}' is not valid`, 400);
    }
  };
  

const validateBgImg = (background_image?: string | null) => {
  if (background_image === null || background_image === undefined) return;
    if (!background_image.trim() || background_image.length < 4 || !(backgroundImages.includes(background_image.toLowerCase()))) {
    return  throwError("Invalid background image: Must be a valid non-empty string", 400);
    }
  };
  
const validateName = (name: string) => {
  const trimmed = name.trim(); 

  if (trimmed.length < 3) {
    return throwError(
      "Name must be at least 3characters long",
      400
    );
  }

  return trimmed; 
};

module.exports = {validateColor, validateBgImg,validateName}

