import { CheckCircle2, CloudUpload, Download, Eye, FileText, Inbox, MessageCircle, Send, Trash2, UploadCloud } from 'lucide-react'
import { useRef, useState, type DragEvent } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '../components/Modal'
import { StatCard } from '../components/StatCard'
import { StatusBadge } from '../components/StatusBadge'
import { useApp } from '../context/AppContext'
import type { DocumentRecord } from '../types'

export function WorkerDashboard() {
  const { currentUser, workers, addDocument, updateDocument, deleteDocument, showToast } = useApp()
  const worker = workers.find((item) => item.id === currentUser?.workerId) ?? workers[0]
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [preview, setPreview] = useState<DocumentRecord | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)
  const pending = worker.documents.filter((document) => document.status === 'Draft' || document.status === 'Pending').length
  const viewed = worker.documents.filter((document) => document.status === 'Viewed').length

  const chooseFile = (candidate?: File) => {
    if (!candidate) return
    if (candidate.type !== 'application/pdf' && !candidate.name.toLowerCase().endsWith('.pdf')) {
      showToast('Tafadhali chagua file yenye format ya PDF pekee.', 'error')
      return
    }
    setFile(candidate)
  }
  const handleDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files[0]) }
  const upload = () => {
    if (!file) { showToast('Chagua PDF kwanza kabla ya ku-upload.', 'error'); return }
    setUploading(true)
    window.setTimeout(() => {
      const document: DocumentRecord = { id: `doc-${Date.now()}`, name: file.name, uploadedAt: 'Leo, sasa hivi', size: `${Math.max(1, Math.round(file.size / 1024))} KB`, status: 'Draft' }
      addDocument(worker.id, document)
      setFile(null)
      setUploading(false)
      showToast('PDF imeongezwa kwenye rasimu zako.')
    }, 800)
  }
  const download = (document: DocumentRecord) => { const blob = new Blob([`Mock PDF: ${document.name}`], { type: 'application/pdf' }); const url = URL.createObjectURL(blob); const anchor = window.document.createElement('a'); anchor.href = url; anchor.download = document.name; anchor.click(); URL.revokeObjectURL(url); showToast('Mock PDF imeandaliwa kwa download.', 'info') }
  const remove = (documentId: string) => { if (window.confirm('Una uhakika unataka kufuta document hii?')) deleteDocument(worker.id, documentId) }

  return <>
    <div className="page-heading-row"><div><span className="eyebrow">WORKER PORTAL</span><h1>Karibu, Mfanyakazi <span className="heading-wave">✦</span></h1><p>Weka taarifa zako kwa wakati ili manager aweze kuzifuatilia.</p></div><Link to="/worker/notifications" className="secondary-button"><MessageCircle size={17} />Ujumbe mpya <span className="button-count">2</span></Link></div>
    <div className="stat-grid"><StatCard label="Documents nilizotuma" value={worker.documents.length} detail="Jumla ya documents" icon={FileText} tone="navy" /><StatCard label="Zinasubiri" value={pending} detail="Draft au pending" icon={Inbox} tone="amber" /><StatCard label="Zimeonekana" value={viewed} detail="Manager ame-view" icon={Eye} tone="mint" /><StatCard label="Ujumbe mpya" value="2" detail="Kutoka kwa manager" icon={MessageCircle} tone="violet" /></div>
    <section className="content-card upload-card"><div className="card-heading"><div><span className="eyebrow">WASILISHA TAARIFA</span><h2>Upload PDF mpya</h2><p className="card-subtitle">Tuma taarifa ya field au stock count kwa manager wako.</p></div><div className="upload-card-icon"><CloudUpload size={22} /></div></div><div className={`drop-zone ${dragging ? 'drop-zone-active' : ''} ${file ? 'drop-zone-selected' : ''}`} onDragOver={(e) => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={handleDrop} onClick={() => fileInput.current?.click()}><input ref={fileInput} hidden type="file" accept="application/pdf,.pdf" onChange={(e) => chooseFile(e.target.files?.[0])} />{file ? <><div className="selected-file-icon"><FileText size={24} /></div><strong>{file.name}</strong><span>{Math.max(1, Math.round(file.size / 1024))} KB · Tayari kwa upload</span><button type="button" className="drop-change" onClick={(e) => { e.stopPropagation(); setFile(null) }}>Ondoa file</button></> : <><div className="drop-icon"><UploadCloud size={25} /></div><strong>Buruta PDF hapa au <em>chagua file</em></strong><span>PDF pekee · Maximum 10MB</span></>}</div><div className="upload-actions"><span className="upload-hint"><CheckCircle2 size={15} />Taarifa zako zinalindwa kwenye demo hii</span><button className="primary-button" onClick={upload} disabled={uploading}>{uploading ? <><span className="spinner" />Ina-upload...</> : <><UploadCloud size={17} />Upload PDF</>}</button></div></section>
    <section className="content-card documents-card"><div className="card-heading"><div><span className="eyebrow">DOCUMENTS ZANGU</span><h2>Historia ya taarifa <span className="heading-count">{worker.documents.length}</span></h2></div><Link to="/worker/documents" className="text-link">Angalia zote <Download size={14} /></Link></div><div className="document-list">{worker.documents.map((document) => <div className="document-row" key={document.id}><div className="document-icon"><FileText size={19} /></div><div className="document-main"><strong>{document.name}</strong><span>{document.uploadedAt} · {document.size}</span></div><StatusBadge status={document.status} /><div className="document-actions"><button className="icon-button" onClick={() => setPreview(document)} aria-label="Preview"><Eye size={17} /></button>{document.status === 'Draft' || document.status === 'Pending' ? <button className="icon-button action-send" onClick={() => { updateDocument(worker.id, document.id, 'Sent'); showToast('Document imetumwa kwa manager.') }} aria-label="Tuma"><Send size={16} /></button> : <button className="icon-button" onClick={() => download(document)} aria-label="Download"><Download size={16} /></button>}<button className="icon-button danger-icon" onClick={() => remove(document.id)} aria-label="Delete"><Trash2 size={16} /></button></div></div>)}</div></section>
    <Modal open={Boolean(preview)} title="Preview ya document" subtitle="Hii ni preview ya mock PDF kwa demo." onClose={() => setPreview(null)}><div className="pdf-preview"><div className="pdf-page"><div className="pdf-page-mark">KDM</div><h3>{preview?.name}</h3><div className="pdf-line pdf-line-wide" /><div className="pdf-line" /><div className="pdf-line pdf-line-short" /><div className="pdf-placeholder"><FileText size={30} /><span>PDF preview</span></div><div className="pdf-line" /><div className="pdf-line pdf-line-wide" /></div></div><div className="modal-footer"><button className="secondary-button" onClick={() => setPreview(null)}>Funga</button>{preview && <button className="primary-button" onClick={() => download(preview)}><Download size={16} />Download mock PDF</button>}</div></Modal>
  </>
}
