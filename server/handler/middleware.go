package handler

import (
	"log"
	"net/http"
	"time"
)

// LoggingMiddleware is a middleware function that logs the details of incoming HTTP requests.
// It logs the IP, Method, Path, User-Agent, Status Code, and the Duration of each request.
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Record the start time of the request
		start := time.Now()

		// Create a loggingResponseWriter to capture the status code
		lw := &loggingResponseWriter{ResponseWriter: w}

		// Call the next handler in the chain
		next.ServeHTTP(lw, r)

		// Log the details of the request after the handler has finished processing it
		log.Printf(
			"IP: %s, Method: %s, Path: %s, User-Agent: %s, Status: %d, Duration: %v",
			r.RemoteAddr,
			r.Method,
			r.URL.Path,
			r.UserAgent(),
			lw.statusCode,
			time.Since(start),
		)
	})
}

// loggingResponseWriter is a custom ResponseWriter that captures the status code
// written by the ResponseWriter's WriteHeader method.
type loggingResponseWriter struct {
	http.ResponseWriter
	statusCode int
}

// WriteHeader captures the status code and then calls the embedded ResponseWriter's
// WriteHeader method with the provided status code.
func (lw *loggingResponseWriter) WriteHeader(statusCode int) {
	lw.statusCode = statusCode
	lw.ResponseWriter.WriteHeader(statusCode)
}
