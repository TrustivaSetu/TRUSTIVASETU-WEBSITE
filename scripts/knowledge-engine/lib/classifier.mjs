export function classify(article){

  const text = (
    (article.title || "") + " " +
    (article.summary || "") + " " +
    (article.source || "")
  ).toLowerCase();

  const tags = [];

  const rules = [
    ["RBI",["reserve bank","rbi","digital lending","nbfc","bank","payment"]],
    ["ABDM",["abdm","abha","ayushman bharat","uhi","health id","aarogya setu","esushrut"]],
    ["NHA",["national health authority","nha"]],
    ["NABH",["nabh","accreditation"]],
    ["ICMR",["icmr"]],
    ["IMA",["ima"]],
    ["IADVL",["iadvl","dermatology"]],
    ["CDSCO",["cdsco","drug","medical device"]],
    ["MoHFW",["ministry of health","mohfw","health ministry"]],
    ["IVF",["ivf","fertility","embryo","icsi"]],
    ["Dental",["dental","dentist","implant","orthodontic"]],
    ["Hair",["hair transplant"]],
    ["Cosmetic",["cosmetic","plastic surgery","liposuction","rhinoplasty"]],
    ["Orthopedic",["knee","hip","spine","orthopedic"]],
    ["Cardiology",["cardiology","heart","cardiac"]]
  ];

  for(const [tag,words] of rules){
    if(words.some(w=>text.includes(w))){
      tags.push(tag);
    }
  }

  return {
    ...article,
    tags,
    primaryTag: tags[0] || "General"
  };
}
