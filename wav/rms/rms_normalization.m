files = {'comprehension_prompt.wav', 'finished_test.wav', 'mom_intro.wav'};
%'final.wav', 'noisy_warn.wav', 'p_store_v4_smoothed.wav', 'prompt.wav', 'ready.wav', 'target_smoothed.wav', 'up_store_v3_smoothed.wav'

target_rms = 0.05;  % safe digital RMS target

for i = 1:length(files)

    [x, fs] = audioread(files{i});
    x = mean(x, 2);

    % Identify active speech, ignoring quiet pauses/silence
    frame_sec = 0.02;
    frame_len = round(frame_sec * fs);

    local_rms = sqrt(movmean(x.^2, frame_len));

    threshold = 0.10 * max(local_rms);
    active = local_rms > threshold;

    if ~any(active)
        warning('No active speech detected in %s. File skipped.', files{i});
        continue
    end

    active_rms = rms(x(active));

    fprintf('%s active RMS before = %.5f\n', files{i}, active_rms);

    % Normalize based on active speech only
    x_norm = x / active_rms * target_rms;

    % Prevent clipping
    peak = max(abs(x_norm));

    if peak > 0.99
        x_norm = x_norm / peak * 0.99;
        warning('%s required clipping protection.', files{i});
    end

    % Confirm final active-speech RMS
    final_active_rms = rms(x_norm(active));

    [~, name, ~] = fileparts(files{i});
    outname = [name '_normalized.wav'];

    audiowrite(outname, x_norm, fs);

    fprintf('%s active RMS after = %.5f\n', files{i}, final_active_rms);
    fprintf('Saved %s\n\n', outname);
end