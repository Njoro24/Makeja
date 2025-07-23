import { CheckCircle, XCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
import PropTypes from 'prop-types';

const Alert = ({ type = 'info', message, onClose, className = '' }) => {
  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 flex-shrink-0" />,
    info: <AlertCircle className="w-5 h-5 flex-shrink-0" />
  };

  if (!message) return null;

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${typeStyles[type]} ${className}`}>
      {icons[type]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium break-words">{message}</p>
      </div>
      {onClose && (
        <button 
          onClick={onClose} 
          className="text-current hover:opacity-70 transition-opacity flex-shrink-0"
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  className: PropTypes.string
};

export default Alert;