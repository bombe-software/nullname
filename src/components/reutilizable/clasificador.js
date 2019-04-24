import BrainJSClassifier from 'natural-brain';

var classifier = new BrainJSClassifier();

classifier.addDocument('Necesito un tema para conversar', 'tema');


classifier.save('data_clasificador.json', function () {});
classifier.train();


/**  
    BrainJSClassifier.load('data_clasificador.json', null, null, (err) => { if (err)  return done(err) } )
    classifier.classify('Dame un tema para conversar')
*/