% Make speech-shaped noise for target and scaled masker
files = {'target_test.wav', 'p_store_5_test.wav'};

ssns = cell(1, length(files));
fs_list = zeros(1, length(files));

for i = 1:length(files)

    [speech, fs] = audioread(files{i});
    speech = mean(speech, 2);

    noise = randn(size(speech));

    S = fft(speech);
    N = fft(noise);

    ssn = real(ifft(abs(S) .* exp(1i * angle(N))));

    ssns{i} = ssn;
    fs_list(i) = fs;

end

if fs_list(1) ~= fs_list(2)
    error('Sampling rates do not match');
end

% Check SNR before any clipping adjustment
snr_before = 20*log10(rms(ssns{1}) / rms(ssns{2}));
fprintf('SSN SNR before clipping protection = %.2f dB\n', snr_before);

% Apply SAME clipping protection to both files
overall_peak = max([max(abs(ssns{1})), max(abs(ssns{2}))]);

if overall_peak > 0.99
    for i = 1:length(ssns)
        ssns{i} = ssns{i} / overall_peak * 0.99;
    end
end

% Check SNR after clipping adjustment
snr_after = 20*log10(rms(ssns{1}) / rms(ssns{2}));
fprintf('SSN SNR after clipping protection = %.2f dB\n', snr_after);

% Save files
for i = 1:length(files)

    [~, name, ~] = fileparts(files{i});
    outname = [name '_SSN.wav'];

    audiowrite(outname, ssns{i}, fs_list(i));

    fprintf('Created %s\n', outname);

end