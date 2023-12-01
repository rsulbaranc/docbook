export const process = async (req, res) => {
  console.log(req.body)
    let _clase = await import(`./bo/${req.body.clase}.js`);
      let obj = new _clase.default();
      let p = null;
      let r = null;
      if(req.body.params){
        r = await obj[req.body.method](req.body.params);
      }
      else{
        r = obj[req.body.method]();
      }
      console.log(r)
      if(typeof r ==='string') res.send(r);
      if(typeof r ==='object') res.json(r);
  };