export const process = async (req, res) => {
  console.log(req.body)
    let _clase = await import(`./bo/${req.body.class}.js`);
      let obj = new _clase.default();
      let p = null;
      let r = null;
      if(req.body.params){
        const params = req.body.params;
        const id_doctor = req.userId;
        r = await obj[req.body.method]([params, id_doctor]);
      }
      else{
        r = await obj[req.body.method](req.userId);
      }
      console.log(r)
      if(typeof r ==='string') res.send(r);
      if(typeof r ==='object') {
        if(r.code) {
          res.status(r.code).json(r)
        }
        else{
          res.json(r)
        }
      }
  };