export const process = async (req, res) => {
    let _clase = await import(`./bo/${req.body.object}.js`);
      let obj = new _clase.default();
      let p = null;
      let r = null;
      if(req.body.params){
        r = obj[req.body.method](req.body.params);
      }
      else{
        r = obj[req.body.method]();
      }
      
      if(typeof r ==='string') res.send(r);
      if(typeof r ==='object') res.json(r);
  };