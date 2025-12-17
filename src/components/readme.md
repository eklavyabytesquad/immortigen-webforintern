# 🩺 ImmortalGen Lab Report Processing API

A comprehensive FastAPI server that processes medical lab reports through AI-powered analysis to provide organ-specific health risk assessments.

## 🌟 **Overview**

This unified API combines three powerful services:
- **Service 1**: PDF → Structured Data (61 health parameters extraction)
- **Service 2**: Structured Data → Organ Analysis (risk scoring & OHR calculation)
- **Service 3**: Combined Pipeline (PDF → Complete Analysis in one call)

## 🏗️ **Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   SERVICE 1     │    │   SERVICE 2     │    │   SERVICE 3     │
│ PDF Processing  │    │ Organ Analysis  │    │ Combined Flow   │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • PDF Upload    │    │ • Risk Scoring  │    │ • Service 1+2   │
│ • Gemini AI     │    │ • OHR Calc      │    │ • Full Pipeline │
│ • Text Extract  │    │ • Guide Select  │    │ • Single Call   │
│ • JSON Output   │    │ • Biomarker     │    │ • Complete Data │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  UNIFIED API    │
                    │ localhost:8000  │
                    └─────────────────┘
```

## 🚀 **Quick Start**

### **1. Installation**

```bash
# Clone the repository
cd c:\Desktop\IMMORTGEN\Report-Extraction\api

# Install dependencies
pip install -r requirements.txt

# Set environment variables (optional)
# GEMINI_API_KEY=your_key_here
# SUPABASE_URL=your_url_here
# SUPABASE_KEY=your_key_here
```

### **2. Start the Server**

```bash
# Method 1: Direct Python execution
python main.py

# Method 2: Using uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 8000

# Method 3: With auto-reload for development
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### **3. Verify Installation**

```bash
# Health check
curl -X GET "http://localhost:8000/health"

# API information
curl -X GET "http://localhost:8000/"

# Interactive documentation
# Open browser: http://localhost:8000/docs
```

## 📖 **API Documentation**

### **Base URL**
```
http://localhost:8000
```

### **Authentication**
All service endpoints require an API key:
```
X-API-Key: your_api_key_here
```

---

## 🔄 **Service 1: PDF to Structured Data**

### **Endpoint:** `POST /service1/convert-pdf`

**Purpose:** Converts lab report PDFs to structured JSON with 61 health parameters.

**Features:**
- ✅ Gemini AI-powered text extraction
- ✅ Medical terminology parsing
- ✅ Automatic gender detection
- ✅ PDF upload to Supabase storage
- ✅ Comprehensive error handling

**Request:**
```bash
curl -X POST "http://localhost:8000/service1/convert-pdf" \
  -H "X-API-Key: your_api_key_here" \
  -F "pdf=@labreport.pdf"
```

**Response:**
```json
{
  "status": "success",
  "message": "PDF successfully converted to structured data",
  "service": "service1",
  "data": {
    "pdf_filename": "labreport.pdf",
    "pdf_url": "https://storage.url/file.pdf",
    "gender": "Male",
    "total_parameters": 61,
    "processing_time_ms": 5000,
    "structured_data": [
      {"gender": "Male"},
      {
        "test_name": "Glucose (Fasting)",
        "result": "95",
        "unit": "mg/dL",
        "reference_range": "70 - 100",
        "method": "Hexokinase"
      }
      // ... 61 total objects
    ]
  }
}
```

**Performance:**
- ⏱️ Processing Time: 30 seconds - 2 minutes
- 📄 Supported Files: PDF up to ~50MB
- 🤖 AI Provider: Google Gemini 1.5 Flash
- ⏰ Timeout: 120 seconds

---

## 🧬 **Service 2: Structured Data to Organ Analysis**

### **Endpoint 1:** `POST /service2/process-structured-data`

**Purpose:** Processes structured health data into organ-specific risk analysis.

**Features:**
- ✅ Biomarker matching & scoring
- ✅ OHR (Overall Health Risk) calculation
- ✅ Gender-specific guide selection
- ✅ 16+ organ system analysis
- ✅ B.C. (Biomarker Criticality) scoring

**Request:**
```bash
curl -X POST "http://localhost:8000/service2/process-structured-data" \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "structured_data": [
      {"gender": "Male"},
      {
        "test_name": "Glucose (Fasting)",
        "result": "95",
        "unit": "mg/dL",
        "reference_range": "70 - 100"
      }
    ]
  }'
```

### **Endpoint 2:** `POST /service2/process-json-file`

**Purpose:** Upload JSON file with structured data for analysis.

**Request:**
```bash
curl -X POST "http://localhost:8000/service2/process-json-file" \
  -H "X-API-Key: your_api_key_here" \
  -F "json_file=@output.json"
```

**Supported JSON Formats:**

1. **Direct Array:**
```json
[
  {"gender": "Male"},
  {"test_name": "Glucose", "result": "95", "unit": "mg/dL"}
]
```

2. **Service 1 Output:**
```json
{
  "status": "success",
  "data": {
    "structured_data": [...]
  }
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Structured data successfully processed to organ analysis",
  "service": "service2",
  "data": {
    "processing_time_ms": 1500,
    "organs_analyzed": 16,
    "analysis": {
      "gender": "Male",
      "guide_used": "male_guide.json",
      "analysis": [
        {
          "organ": "Cardiovascular System",
          "biomarkers": [
            {
              "biomarker": "Cholesterol (Total)",
              "value": 180.0,
              "bc_score": 1.2,
              "significance": 3.0,
              "weighted_contribution": 3.6
            }
          ],
          "total_weighted_score": 15.2,
          "total_significance": 12.0,
          "ohr": 1.27
        }
      ],
      "organ_ohr_summary": {
        "Cardiovascular System": 1.27,
        "Liver Health": 1.45,
        "Kidney Health": 1.0
      }
    }
  }
}
```

**Performance:**
- ⏱️ Processing Time: 1-5 seconds
- 🧮 Algorithm: Advanced biomarker scoring
- 📊 Output: 16+ organ risk scores
- 🎯 Accuracy: Medical-grade precision

---

## 🔬 **Service 3: Combined Processing**

### **Endpoint:** `POST /service3/combined-blood-report`

**Purpose:** Complete pipeline from PDF to organ analysis in a single call.

**Features:**
- ✅ Service 1 + Service 2 combined
- ✅ Single API call for complete analysis
- ✅ Comprehensive data output
- ✅ Full pipeline logging

**Request:**
```bash
curl -X POST "http://localhost:8000/service3/combined-blood-report" \
  -H "X-API-Key: your_api_key_here" \
  -F "pdf=@labreport.pdf"
```

**Response:**
```json
{
  "status": "success",
  "message": "PDF successfully processed through complete analysis pipeline",
  "service": "service3",
  "pipeline_stages": {
    "stage_1": "PDF → Structured Data (Completed)",
    "stage_2": "Structured Data → Organ Analysis (Completed)"
  },
  "data": {
    "pdf_filename": "labreport.pdf",
    "pdf_url": "https://storage.url/file.pdf",
    "gender": "Male",
    "total_parameters_extracted": 61,
    "organs_analyzed": 16,
    "processing_time_ms": 8500,
    "raw_structured_data": [/* Service 1 output */],
    "organ_specific_analysis": {/* Service 2 output */}
  }
}
```

**Performance:**
- ⏱️ Processing Time: Combined Service 1 + Service 2
- 🔄 Pipeline: Fully automated
- 📊 Output: Complete health analysis
- 💾 Storage: All data preserved

---

## 🏥 **Health & Monitoring**

### **Health Check:** `GET /health`

```bash
curl -X GET "http://localhost:8000/health"
```

**Response:**
```json
{
  "status": "healthy",
  "service": "ImmortalGen Lab Report Processing API",
  "version": "2.0.0",
  "services": ["service1", "service2", "service3"],
  "supabase_status": "connected",
  "response_time_ms": 125,
  "timestamp": "2025-01-01T12:00:00Z"
}
```

### **API Info:** `GET /`

Complete API overview with all endpoints and features.

---

## 🔧 **Configuration**

### **Environment Variables**

```env
# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_service_role_key
STORAGE_BUCKET=your_storage_bucket_name

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
```

### **Guide Files**

The system uses gender-specific guide files for biomarker analysis:

- `male_guide.json` - Male-specific biomarker scoring
- `female_guide.json` - Female-specific biomarker scoring

These files contain:
- Organ definitions
- Biomarker lists per organ
- Ideal/critical ranges
- Significance weights

---

## 🌐 **Frontend Integration**

### **CORS Configuration**

The API includes CORS middleware for frontend integration:

```python
allow_origins=[
    "http://localhost:3000",  # Next.js default
    "http://localhost:3001",  # Alternative port
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "https://your-domain.com"  # Production domain
]
```

### **Next.js Integration Example**

```javascript
// lib/api.js
const API_BASE_URL = 'http://localhost:8000';
const API_KEY = 'your_api_key_here';

export async function processPDF(pdfFile) {
  const formData = new FormData();
  formData.append('pdf', pdfFile);

  const response = await fetch(`${API_BASE_URL}/service3/combined-blood-report`, {
    method: 'POST',
    headers: {
      'X-API-Key': API_KEY,
    },
    body: formData,
  });

  return await response.json();
}
```

---

## 📊 **Data Flow**

```
PDF Upload → Service 1: Text Extraction → Gemini AI Processing → Structured Data Output
    ↓
JSON Upload → Service 2: Biomarker Matching → Guide Selection by Gender → Risk Score Calculation → OHR per Organ System → Complete Health Analysis
    ↓
Service 3 → Combined Pipeline → Complete Analysis
```

---

## 🚨 **Error Handling**

### **Common Error Codes**

| Code | Description | Solution |
|------|-------------|----------|
| `400` | Bad Request | Check file format, JSON structure |
| `401` | Unauthorized | Verify API key in X-API-Key header |
| `404` | Not Found | Ensure guide files exist |
| `500` | Internal Error | Check server logs, Gemini API status |
| `504` | Gateway Timeout | Reduce PDF size, retry request |

### **Error Response Format**

```json
{
  "detail": "Specific error description"
}
```

---

## 🧪 **Testing**

### **Manual Testing**

```bash
# 1. Health Check
curl -X GET "http://localhost:8000/health"

# 2. Service 2 Test (no file needed)
curl -X POST "http://localhost:8000/service2/process-structured-data" \
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \
  -H "Content-Type: application/json" \
  -d '{"structured_data":[{"gender":"Male"},{"test_name":"Glucose","result":"95","unit":"mg/dL"}]}'

# 3. Service 1 Test (requires PDF)
curl -X POST "http://localhost:8000/service1/convert-pdf" \
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \
  -F "pdf=@labreport.pdf"

# 4. Service 3 Test (requires PDF)
curl -X POST "http://localhost:8000/service3/combined-blood-report" \
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \
  -F "pdf=@labreport.pdf"
```

### **Interactive Testing**

Visit these URLs when server is running:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## 📁 **Project Structure**

```
api/
├── main.py                 # Main FastAPI server
├── service1_logic.py       # PDF processing logic
├── service2_logic.py       # Organ analysis logic  
├── service3_logic.py       # Combined pipeline logic
├── shared_utils.py         # Database & logging utilities
├── requirements.txt        # Python dependencies
├── male_guide.json         # Male biomarker guide
├── female_guide.json       # Female biomarker guide
├── output.json            # Sample Service 1 output
├── labreport.pdf          # Sample test PDF
└── README.md              # This documentation
```

---

## 🔒 **Security Features**

- ✅ **API Key Authentication** - All endpoints protected
- ✅ **Request Logging** - Complete audit trail
- ✅ **File Validation** - PDF/JSON format checking
- ✅ **Error Sanitization** - No sensitive data exposure
- ✅ **CORS Protection** - Configured origin restrictions
- ✅ **Input Validation** - Comprehensive data checking

---

## 📈 **Performance Metrics**

| Service | Avg Time | Max File Size | Timeout |
|---------|----------|---------------|---------|
| Service 1 | 30s-2min | 50MB PDF | 120s |
| Service 2 | 1-5s | 10MB JSON | 30s |
| Service 3 | Combined | 50MB PDF | 150s |

---

## 🛠️ **Development**

### **Local Development**

```bash
# Install in development mode
pip install -r requirements.txt

# Run with auto-reload
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# View logs
tail -f logs/server.log
```

### **Adding New Features**

1. **New Endpoint**: Add to `main.py`
2. **Business Logic**: Create/update logic files
3. **Database**: Modify `shared_utils.py`
4. **Testing**: Update test examples
5. **Documentation**: Update this README

---

## 🚀 **Deployment**

### **Production Deployment**

```bash
# Install production dependencies
pip install -r requirements.txt

# Set production environment variables
export GEMINI_API_KEY=prod_key
export SUPABASE_URL=prod_url
export SUPABASE_KEY=prod_key

# Run with production settings
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4

# Or use gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### **Docker Deployment**

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## 📞 **Support**

### **Common Issues**

1. **Gemini API Timeout**: Reduce PDF size or retry
2. **Missing Guide Files**: Ensure `male_guide.json` and `female_guide.json` exist
3. **Supabase Connection**: Check credentials and network
4. **CORS Errors**: Verify frontend origin in CORS settings

### **Debugging**

```bash
# Check server status
curl -X GET "http://localhost:8000/health"

# View server logs
python main.py

# Test individual services
# Service 2 (fastest to test)
curl -X POST "http://localhost:8000/service2/process-structured-data" \
  -H "X-API-Key: test_key" \
  -H "Content-Type: application/json" \
  -d '{"structured_data":[{"gender":"Male"}]}'
```

---

## 🎯 **Features Summary**

✅ **PDF Processing** - Gemini AI-powered extraction  
✅ **Organ Analysis** - 16+ organ systems evaluated  
✅ **Risk Scoring** - Medical-grade OHR calculation  
✅ **Gender-Specific** - Male/female guide selection  
✅ **File Storage** - Supabase cloud storage  
✅ **Request Logging** - Complete audit trail  
✅ **Health Monitoring** - Real-time status checks  
✅ **CORS Support** - Frontend integration ready  
✅ **Error Handling** - Comprehensive error management  
✅ **API Documentation** - Interactive Swagger/ReDoc  
✅ **Multiple Formats** - PDF, JSON input support  
✅ **Combined Pipeline** - Single-call complete analysis  

---

## 📝 **Version History**

- **v2.0.0** - Unified server with all three services
- **v1.0.0** - Individual service implementations

---

**🩺 ImmortalGen Lab Report Processing API - Transforming medical data into actionable health insights.**
└─────────────────┘    └──────────────────┘    └─────────────────────┘
                                                           │
                                                           ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│ Organ Analysis  │◀───│   Service 2      │◀───│   Structured JSON   │
│   with OHR      │    │ JSON → Analysis  │    │                     │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
```

## 🚀 Services Overview

### Service 1: PDF to Structured Data (`service1.py`)
- **Port**: 8001
- **Purpose**: Stage 1 - PDF → Structured JSON
- **Features**:
  - PDF text extraction using `pdfplumber`
  - Gemini AI processing for biomarker extraction
  - Extracts exactly 61 health parameters
  - Auto-detects patient gender
  - Returns clean structured JSON

### Service 2: Organ-Specific Analysis (`service2.py`)
- **Port**: 8002  
- **Purpose**: Stage 2 - Structured JSON → Organ Analysis
- **Features**:
  - Gender-based guide selection
  - Biomarker matching and scoring
  - Organ-specific risk calculation
  - Overall Health Risk (OHR) computation
  - Weighted scoring using B.S. × B.C. formula

## 📦 Installation

1. **Install Dependencies**:
   ```bash
   cd api
   pip install -r requirements.txt
   ```

2. **Ensure Guide Files Are Available**:
   - `male_guide.json` - Male biomarker scoring guide
   - `female_guide.json` - Female biomarker scoring guide
   
   These should be in the parent directory or accessible from the API folder.

3. **Set Up Gemini API Key**:
   - Get API key from Google AI Studio
   - Replace the placeholder in test files or pass as parameter

## 🔧 Running the Services

### Start Service 1 (PDF Processing)
```bash
cd api
python service1.py
```
- API available at: http://localhost:8001
- Documentation: http://localhost:8001/docs

### Start Service 2 (Organ Analysis)  
```bash
cd api
python service2.py
```
- API available at: http://localhost:8002
- Documentation: http://localhost:8002/docs

## 📋 API Endpoints

### Service 1 Endpoints

#### `POST /convert-pdf`
Upload PDF file and convert to structured data.
- **Input**: PDF file upload + Gemini API key
- **Output**: Structured JSON with 61 health parameters

#### `POST /convert-pdf-file`
Convert PDF from file path to structured data.
- **Input**: PDF file path + Gemini API key
- **Output**: Structured JSON with 61 health parameters

#### `GET /health`
Health check endpoint.

### Service 2 Endpoints

#### `POST /process-structured-data`
Process structured data directly.
- **Input**: JSON array of structured data
- **Output**: Organ-specific analysis with OHR scores

#### `POST /process-json-file`
Upload JSON file for processing.
- **Input**: JSON file upload
- **Output**: Organ-specific analysis with OHR scores

#### `POST /process-json-filepath`
Process JSON file from server path.
- **Input**: JSON file path on server
- **Output**: Organ-specific analysis with OHR scores

#### `GET /health`
Health check endpoint.

## 🧪 Testing

The `test/` folder contains comprehensive test suites:

### Python Tests
```bash
# Test Service 1
python test/test_service1.py

# Test Service 2  
python test/test_service2.py
```

### CURL Tests (Linux/macOS)
```bash
# Test Service 1
chmod +x test/curl_test_service1.sh
./test/curl_test_service1.sh

# Test Service 2
chmod +x test/curl_test_service2.sh
./test/curl_test_service2.sh
```

### Windows Batch Tests
```cmd
REM Test Service 1
test\test_service1.bat

REM Test Service 2
test\test_service2.bat
```

## 📊 Example Usage

### Complete Pipeline Test
```bash
# 1. Start both services
python api/service1.py &
python api/service2.py &

# 2. Convert PDF to structured data
curl -X POST "http://localhost:8001/convert-pdf-file" \
  -F "pdf_path=RAJEEVSINGH-LAB REPORT.pdf" \
  -F "api_key=YOUR_GEMINI_API_KEY" \
  -o structured_data.json

# 3. Process structured data to organ analysis
curl -X POST "http://localhost:8002/process-json-filepath" \
  -F "json_path=structured_data.json" \
  -o organ_analysis.json
```

## 📈 Output Structure

### Service 1 Output
```json
{
  "status": "success",
  "message": "PDF successfully converted to structured data",
  "data": {
    "pdf_filename": "report.pdf",
    "gender": "M",
    "total_parameters": 61,
    "structured_data": [
      {"gender": "M"},
      {
        "test_name": "TSH",
        "result": "3.14", 
        "unit": "mIU/L",
        "reference_range": "0.4 - 4.0",
        "method": "ECLIA"
      }
      // ... 60 more parameters
    ]
  }
}
```

### Service 2 Output
```json
{
  "status": "success",
  "message": "Structured data successfully processed",
  "data": {
    "gender": "M",
    "guide_used": "male_guide.json",
    "analysis": [
      {
        "organ": "thyroid",
        "biomarkers": [...],
        "ohr": 1.23
      }
      // ... more organs
    ],
    "organ_ohr_summary": {
      "thyroid": 1.23,
      "kidneys": 2.45
      // ... more organs
    }
  }
}
```

## 🔍 Health Risk Interpretation

- **OHR 1.0 - 1.5**: Low Risk (GREEN)
- **OHR 1.6 - 2.5**: Medium Risk (YELLOW) 
- **OHR 2.6 - 3.5**: High Risk (ORANGE)
- **OHR 3.6 - 4.0**: Critical Risk (RED)

## 🛠️ Development Notes

- Services are designed to be stateless and can run independently
- Each service has comprehensive error handling
- JSON parsing is robust with encoding support
- Biomarker matching uses intelligent algorithms
- Gender-specific guides ensure accurate scoring

## 🚨 Troubleshooting

### Common Issues

1. **Import Errors**: Install requirements.txt
2. **Guide File Not Found**: Ensure guide files are accessible
3. **Gemini API Errors**: Check API key validity and quota
4. **PDF Processing Errors**: Verify PDF file integrity
5. **Port Conflicts**: Change ports in service files if needed

### Debug Mode
Both services support reload mode for development:
```python
uvicorn.run(app, host="0.0.0.0", port=8001, reload=True)
```

## 📞 Support

For issues or questions:
1. Check the `/docs` endpoint of each service
2. Review test files for usage examples
3. Examine error responses for debugging info
4. Verify all dependencies are installed correctly
