import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, FileText, X, Check, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../lib/api';

export default function ReceiptUploader({
    onUploadComplete,
    onOcrResult,
    maxSizeMB = 10,
    className = ''
}) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [uploadedReceipt, setUploadedReceipt] = useState(null);
    const [ocrResult, setOcrResult] = useState(null);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    }, []);

    const handleFileSelect = (selectedFile) => {
        setError(null);

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
        if (!allowedTypes.includes(selectedFile.type)) {
            setError('Please upload a PNG, JPG, WebP, or PDF file');
            return;
        }

        // Validate file size
        const maxBytes = maxSizeMB * 1024 * 1024;
        if (selectedFile.size > maxBytes) {
            setError(`File must be under ${maxSizeMB}MB`);
            return;
        }

        setFile(selectedFile);

        // Create preview for images
        if (selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };

    const handleInputChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            handleFileSelect(selectedFile);
        }
    };

    const uploadAndProcess = async () => {
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            // Create form data
            const formData = new FormData();
            formData.append('receipt', file);
            formData.append('autoProcess', 'false');

            // Upload
            const uploadResult = await api.receipts.upload(formData);
            setUploadedReceipt(uploadResult.receipt);
            setUploading(false);

            if (onUploadComplete) {
                onUploadComplete(uploadResult.receipt);
            }

            // Trigger OCR processing
            setProcessing(true);
            const verifyResult = await api.receipts.verify(uploadResult.receipt.id);
            setOcrResult(verifyResult.ocrResult);
            setProcessing(false);

            if (onOcrResult) {
                onOcrResult(verifyResult.ocrResult);
            }

            toast.success('Receipt processed successfully!');
        } catch (err) {
            setError(err.message || 'Failed to upload receipt');
            setUploading(false);
            setProcessing(false);
            toast.error(err.message || 'Upload failed');
        }
    };

    const reset = () => {
        setFile(null);
        setPreview(null);
        setUploadedReceipt(null);
        setOcrResult(null);
        setError(null);
    };

    const formatPrice = (cents) => {
        if (!cents) return 'N/A';
        return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    };

    return (
        <div className={className}>
            {/* Upload Zone */}
            {!uploadedReceipt && (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                        relative border-4 border-dashed rounded-xl p-8 text-center transition-all
                        ${isDragging
                            ? 'border-pink-500 bg-pink-500/10'
                            : 'border-black/30 hover:border-black/50 bg-white'
                        }
                        ${file ? 'border-black' : ''}
                    `}
                    style={file ? { boxShadow: '4px 4px 0px #000' } : {}}
                >
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        onChange={handleInputChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {!file ? (
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center">
                                <Upload className="w-8 h-8 text-pink-500" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-black">
                                    Drop your receipt here
                                </p>
                                <p className="text-black/60 text-sm mt-1">
                                    or click to browse (PNG, JPG, PDF up to {maxSizeMB}MB)
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Receipt preview"
                                    className="max-h-48 mx-auto rounded-lg border-2 border-black"
                                />
                            ) : (
                                <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                                    <FileText className="w-8 h-8 text-blue-500" />
                                </div>
                            )}
                            <p className="font-medium text-black">{file.name}</p>
                            <div className="flex items-center justify-center gap-3">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        reset();
                                    }}
                                    className="px-4 py-2 text-sm font-bold text-black/70 hover:text-black"
                                >
                                    Change
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        uploadAndProcess();
                                    }}
                                    disabled={uploading || processing}
                                    className="px-6 py-2 bg-pink-500 text-white font-bold rounded-lg border-2 border-black hover:bg-pink-600 disabled:opacity-50 flex items-center gap-2"
                                    style={{ boxShadow: '3px 3px 0px #000' }}
                                >
                                    {uploading || processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            {uploading ? 'Uploading...' : 'Processing...'}
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4" />
                                            Upload & Verify
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Error */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 bg-red-100 border-2 border-red-500 rounded-lg flex items-center gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-red-700">{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* OCR Result Display */}
            <AnimatePresence>
                {ocrResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-6 bg-white border-4 border-black rounded-xl"
                        style={{ boxShadow: '4px 4px 0px #000' }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-black flex items-center gap-2">
                                <Check className="w-5 h-5 text-green-500" />
                                Receipt Verified
                            </h3>
                            <button
                                onClick={reset}
                                className="text-black/50 hover:text-black"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            {ocrResult.vendor && (
                                <div>
                                    <span className="text-black/50">Vendor</span>
                                    <p className="font-semibold text-black capitalize">{ocrResult.vendor}</p>
                                </div>
                            )}
                            {ocrResult.section && (
                                <div>
                                    <span className="text-black/50">Section</span>
                                    <p className="font-semibold text-black">{ocrResult.section}</p>
                                </div>
                            )}
                            {ocrResult.row && (
                                <div>
                                    <span className="text-black/50">Row</span>
                                    <p className="font-semibold text-black">{ocrResult.row}</p>
                                </div>
                            )}
                            {ocrResult.seats && (
                                <div>
                                    <span className="text-black/50">Seats</span>
                                    <p className="font-semibold text-black">{ocrResult.seats}</p>
                                </div>
                            )}
                            <div className="col-span-2 pt-4 border-t-2 border-black/10">
                                <span className="text-black/50">Face Value (per ticket)</span>
                                <p className="text-2xl font-black text-green-600">
                                    {formatPrice(ocrResult.faceValueCents)}
                                </p>
                            </div>
                            {ocrResult.confidence && (
                                <div className="col-span-2">
                                    <span className="text-black/50">Confidence</span>
                                    <div className="w-full bg-black/10 rounded-full h-2 mt-1">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{ width: `${Math.round(ocrResult.confidence * 100)}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-black/50">
                                        {Math.round(ocrResult.confidence * 100)}%
                                    </span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
