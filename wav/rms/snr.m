[target, fs1] = audioread('target_smoothed_normalized.wav');
[masker, fs2] = audioread('p_store_v5_smoothed_normalized.wav');

target = mean(target, 2);
masker = mean(masker, 2);

if fs1 ~= fs2
    error('Files must have the same sampling rate');
end

n = min(length(target), length(masker));
target = target(1:n);
masker = masker(1:n);

snr_dB = 10;

masker_scaled = masker / rms(masker) * (rms(target) / 10^(snr_dB/20));

% Test individual files
audiowrite('target_test.wav', target, fs1);
audiowrite('p_store_5_test.wav', masker_scaled, fs1);

achieved_snr = 20*log10(rms(target) / rms(masker_scaled));
fprintf('Achieved SNR = %.2f dB\n', achieved_snr);

achieved_snr = 20*log10(rms(target) / rms(masker_scaled));
fprintf('Achieved SNR = %.2f dB\n', achieved_snr);

mixed = target + masker_scaled;

peak = max(abs(mixed));
if peak > 0.99
    mixed = mixed / peak * 0.99;
end

audiowrite('pstore_v5_10db_snr.wav', mixed, fs1);

fprintf('Target RMS = %.5f\n', rms(target));
fprintf('Masker RMS = %.5f\n', rms(masker_scaled));