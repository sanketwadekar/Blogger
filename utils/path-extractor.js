module.exports = function pathExtractor(req,res, next) {
        // Escaping user input to be treated as a literal 
        // string within a regular expression accomplished by 
        // simple replacement
        function escapeRegExp(str) {
         return (typeof(str)!='undefined')?str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'):`http://${req.get('host')}`;
        }
        // Replace utility function
        function replaceAll(str, find, replace) {
         return (typeof(str)!='undefined')?str.replace(new RegExp(escapeRegExp(find), 'g'), replace):`http://${req.get('host')}`; 
        }
        req.pathFrom = (replaceAll(req.get('referer'), `http://${req.get('host')}`, ''));
        return next();
      };