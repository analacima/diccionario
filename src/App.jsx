import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Form, Button, Card, Alert, Spinner, ButtonGroup } from 'react-bootstrap'
import './App.css'

// Mapping of radical numbers to their meanings (Kangxi radicals)
const radicalMeanings = {
  1: { meaning: 'one', pinyin: 'yī' },
  2: { meaning: 'line', pinyin: 'gǔn' },
  3: { meaning: 'dot', pinyin: 'zhǔ' },
  4: { meaning: 'slash', pinyin: 'piě' },
  7: { meaning: 'two', pinyin: 'èr' },
  8: { meaning: 'lid', pinyin: 'gài' },
  9: { meaning: 'person', pinyin: 'rén' },
  10: { meaning: 'legs', pinyin: 'rén' },
  11: { meaning: 'enter', pinyin: 'rù' },
  12: { meaning: 'eight', pinyin: 'bā' },
  13: { meaning: 'cover', pinyin: 'mì' },
  14: { meaning: 'ice', pinyin: 'bīng' },
  15: { meaning: 'table', pinyin: 'jí' },
  16: { meaning: 'cliff', pinyin: 'yá' },
  17: { meaning: 'can', pinyin: 'kǎn' },
  18: { meaning: 'knife', pinyin: 'dāo' },
  19: { meaning: 'strength', pinyin: 'lì' },
  20: { meaning: 'wrap', pinyin: 'bāo' },
  21: { meaning: 'spoon', pinyin: 'pī' },
  22: { meaning: 'box', pinyin: 'fāng' },
  23: { meaning: 'hide', pinyin: 'yǐn' },
  24: { meaning: 'ten', pinyin: 'shí' },
  25: { meaning: 'divination', pinyin: 'bǔ' },
  26: { meaning: 'seal', pinyin: 'yìn' },
  27: { meaning: 'cliff', pinyin: 'yá' },
  28: { meaning: 'private', pinyin: 'sī' },
  29: { meaning: 'again', pinyin: 'yòu' },
  30: { meaning: 'mouth', pinyin: 'kǒu' },
  31: { meaning: 'enclosure', pinyin: 'wéi' },
  32: { meaning: 'earth', pinyin: 'tǔ' },
  33: { meaning: 'scholar', pinyin: 'shì' },
  34: { meaning: 'go', pinyin: 'chū' },
  35: { meaning: 'evening', pinyin: 'xī' },
  36: { meaning: 'big', pinyin: 'dà' },
  37: { meaning: 'woman', pinyin: 'nǚ' },
  38: { meaning: 'child', pinyin: 'zǐ' },
  39: { meaning: 'roof', pinyin: 'mián' },
  40: { meaning: 'inch', pinyin: 'cùn' },
  41: { meaning: 'small', pinyin: 'xiǎo' },
  42: { meaning: 'crooked', pinyin: 'yǐ' },
  43: { meaning: 'mountain', pinyin: 'shān' },
  44: { meaning: 'river', pinyin: 'chuān' },
  45: { meaning: 'work', pinyin: 'gōng' },
  46: { meaning: 'self', pinyin: 'jǐ' },
  47: { meaning: 'bow', pinyin: 'gōng' },
  48: { meaning: 'hair', pinyin: 'mí' },
  49: { meaning: 'step', pinyin: 'chì' },
  50: { meaning: 'spear', pinyin: 'jǐng' },
  51: { meaning: 'cave', pinyin: 'kǎn' },
  52: { meaning: 'short step', pinyin: 'yǐ' },
  53: { meaning: 'city', pinyin: 'yì' },
  54: { meaning: 'cloth', pinyin: 'jìn' },
  55: { meaning: 'long step', pinyin: 'yǐn' },
  56: { meaning: 'arrow', pinyin: 'shǐ' },
  57: { meaning: 'heart', pinyin: 'xīn' },
  58: { meaning: 'halberd', pinyin: 'gē' },
  59: { meaning: 'door', pinyin: 'hù' },
  60: { meaning: 'hand', pinyin: 'shǒu' },
  61: { meaning: 'branch', pinyin: 'zhī' },
  62: { meaning: 'spear', pinyin: 'gē' },
  63: { meaning: 'arrow', pinyin: 'shǐ' },
  64: { meaning: 'father', pinyin: 'fù' },
  65: { meaning: 'not', pinyin: 'wú' },
  66: { meaning: 'compare', pinyin: 'bǐ' },
  67: { meaning: 'clan', pinyin: 'shì' },
  68: { meaning: 'measure', pinyin: 'dòu' },
  69: { meaning: 'inch', pinyin: 'cùn' },
  70: { meaning: 'square', pinyin: 'fāng' },
  71: { meaning: 'no', pinyin: 'wú' },
  72: { meaning: 'sun', pinyin: 'rì' },
  73: { meaning: 'say', pinyin: 'yuē' },
  74: { meaning: 'moon', pinyin: 'yuè' },
  75: { meaning: 'tree', pinyin: 'mù' },
  76: { meaning: 'lack', pinyin: 'qiàn' },
  77: { meaning: 'stop', pinyin: 'zhǐ' },
  78: { meaning: 'death', pinyin: 'sǐ' },
  79: { meaning: 'weapon', pinyin: 'shǐ' },
  80: { meaning: 'do not', pinyin: 'wú' },
  81: { meaning: 'compare', pinyin: 'bǐ' },
  82: { meaning: 'fur', pinyin: 'máo' },
  83: { meaning: 'clan', pinyin: 'shì' },
  84: { meaning: 'steam', pinyin: 'qì' },
  85: { meaning: 'water', pinyin: 'shuǐ' },
  86: { meaning: 'fire', pinyin: 'huǒ' },
  87: { meaning: 'claw', pinyin: 'zhǎo' },
  88: { meaning: 'father', pinyin: 'fù' },
  89: { meaning: 'split', pinyin: 'piàn' },
  90: { meaning: 'cow', pinyin: 'niú' },
  91: { meaning: 'dog', pinyin: 'quǎn' },
  92: { meaning: 'jade', pinyin: 'yù' },
  93: { meaning: 'melon', pinyin: 'guā' },
  94: { meaning: 'tile', pinyin: 'wǎ' },
  95: { meaning: 'sweet', pinyin: 'gān' },
  96: { meaning: 'life', pinyin: 'shēng' },
  97: { meaning: 'use', pinyin: 'yòng' },
  98: { meaning: 'field', pinyin: 'tián' },
  99: { meaning: 'bolt of cloth', pinyin: 'bó' },
  100: { meaning: 'sickness', pinyin: 'bìng' }
};

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [characterData, setCharacterData] = useState(null)
  const [radical, setRadical] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchCharacter = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      setError('Please enter a Chinese character')
      return
    }

    if (searchTerm.length > 1) {
      setError('Please enter only one character at a time')
      return
    }

    setLoading(true)
    setError('')
    setCharacterData(null)
    setRadicals([])

    try {
      // Get character information including radical numbers
      const characterUrl = `http://ccdb.hemiola.com/characters/string/${encodeURIComponent(searchTerm)}?fields=kDefinition,kMandarin,kRSKangXi,string`
      const characterResponse = await fetch(characterUrl)
      
      if (!characterResponse.ok) {
        throw new Error(`HTTP error! status: ${characterResponse.status}`)
      }
      
      const characterData = await characterResponse.json()
      
      if (characterData.length === 0) {
        setError('Character not found')
        return
      }

      setCharacterData(characterData[0])

      // Parse the radical information
      const radicalNumbers = characterData[0].kRSKangXi.split('.')
      const mainRadicalNumber = parseInt(radicalNumbers[0])
      
      // Get radical information from our mapping
      if (radicalMeanings[mainRadicalNumber]) {
        setRadical({
          number: mainRadicalNumber,
          ...radicalMeanings[mainRadicalNumber]
        })
      } else {
        setRadical({
          number: mainRadicalNumber,
          meaning: 'Unknown radical',
          pinyin: 'Unknown'
        })
      }
    } catch (err) {
      setError('Error fetching results. Please try again.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Chinese Character Radical Analysis</h1>
      
      <Form onSubmit={searchCharacter} className="mb-4">
        <div className="search-controls mb-3">

          <Form.Control
            type="text"
            placeholder="Enter a Chinese character (e.g., '水', '山')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
          <Form.Text className="text-muted">
            Enter a single Chinese character to analyze its radicals.
          </Form.Text>
        </div>

        <div className="d-grid">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Searching...
              </>
            ) : (
              'Search'
            )}
          </Button>
        </div>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {characterData && (
        <div className="results-container">
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="display-4 text-center">{characterData.string}</Card.Title>
              <Card.Text>
                <div className="character-info mb-4">
                  <div className="pronunciation-item">
                    <strong>Mandarin (Pinyin):</strong> {characterData.kMandarin}
                  </div>
                  <div className="definition mb-3">
                    <strong>Definition:</strong> {characterData.kDefinition}
                  </div>
                  <div className="radical-info">
                    <strong>Radical Number:</strong> {characterData.kRSKangXi.split('.')[0]}
                  </div>
                </div>

                <h5 className="mb-3">Radical Analysis:</h5>
                {radical && (
                  <Card className="radical-card mb-3">
                    <Card.Body>
                      <div className="radical-details">
                        <div className="radical-number mb-2">
                          <strong>Radical Number:</strong> {radical.number}
                        </div>
                        <div className="pronunciation-item mb-2">
                          <strong>Pinyin:</strong> {radical.pinyin}
                        </div>
                        <div className="definition">
                          <strong>Meaning:</strong> {radical.meaning}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  )
}

export default App
