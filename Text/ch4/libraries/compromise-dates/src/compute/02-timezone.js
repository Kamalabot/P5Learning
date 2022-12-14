// timezone abbreviations
// (from spencermountain/timezone-soft)
const zones = [
  'act',
  'aft',
  'akst',
  'anat',
  'art',
  'azot',
  'azt',
  'bnt',
  'bot',
  'bt',
  'cast',
  'cat',
  'cct',
  'chast',
  'chut',
  'ckt',
  'cvt',
  'cxt',
  'davt',
  'eat',
  'ect',
  'fjt',
  'fkst',
  'fnt',
  'gamt',
  'get',
  'gft',
  'gilt',
  'gyt',
  'hast',
  'hncu',
  'hneg',
  'hnnomx',
  'hnog',
  'hnpm',
  'hnpmx',
  'hntn',
  'hovt',
  'iot',
  'irkt',
  'jst',
  'kgt',
  'kost',
  'lint',
  'magt',
  'mart',
  'mawt',
  'mmt',
  'nct',
  'nft',
  'novt',
  'npt',
  'nrt',
  'nut',
  'nzst',
  'omst',
  'pet',
  'pett',
  'phot',
  'phst',
  'pont',
  'pwt',
  'ret',
  'sakt',
  'samt',
  'sbt',
  'sct',
  'sret',
  'srt',
  'syot',
  'taht',
  'tft',
  'tjt',
  'tkt',
  'tlt',
  'tmt',
  'tot',
  'tvt',
  'ulat',
  'vut',
  'wakt',
  'wat',
  'wet',
  'wft',
  'wit',
  'wst',
  'yekt',
].reduce((h, str) => {
  h[str] = true
  return h
}, {})

const tagTz = function (doc) {
  // 4pm PST
  let m = doc.match('#Time [#Acronym]', 0)
  if (m.found) {
    let str = m.text('reduced')
    if (zones[str] === true) {
      m.tag('Timezone', 'tz-abbr')
    }
  }
}
export default tagTz
