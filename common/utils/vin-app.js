function appFormTemplate(additionAttr) {
  let result = {
    data: {
      metadata:{
        app_name: "Sân chơi trí tuệ",
        app_id: 123456,
        ...additionAttr
      }
    }
  }
  return result;
}
